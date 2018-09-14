import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import JSPdf from 'jspdf';
import html2canvas from 'html2canvas';
import { connect } from 'react-redux';
import { firebase } from '../../firebase/index';
import { setCharacter } from '../../redux/actions';
import { monthNames, shortAttributes, attributeNames, skillNames, skillAttributes } from '../../copy/general';

import { raceInfo, classInfo, armorsInfo, packsInfo } from '../../copy/characterOptions';
import { getProfiencyBonus } from '../../utils';

class CharacterPage extends Component {
  state = {
    character: {
      name: null,
      characterClass: 'barbarian',
      level: null,
      race: 'dragonborn',
      alignment: null,
      attributes: {
        str: '10',
        dex: '10',
        con: '10',
        int: '10',
        wis: '10',
        cha: '10',
      },
      skills: [],
      chosenWeapon: '',
      chosenArmor: '',
      chosenPack: '',
      languages: null,
    },
    error: null,
  };

  componentDidMount() {
    const { charactername } = this.props.match.params;
    const { db } = firebase;
    db.collection('characters')
      .doc(charactername)
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log('the doc exists');
          this.setState(state => ({
            ...state,
            character: doc.data(),
          }));
        } else {
          console.log('No such document exists!');
          this.setState(state => ({
            ...state,
            error: 'The character you are trying to access could not be retrieved',
          }));
        }
      })
      .catch(error => {
        console.log('An error ocured when retrieving the document', error);
        this.setState(state => ({
          ...state,
          error: 'The character you are trying to access could not be retrieved',
        }));
      });
  }

  getUsername = userId =>
    new Promise(resolve => {
      const { db } = firebase;
      db.collection('users')
        .where('userId', '==', userId)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            resolve(doc.data().username);
          });
        })
        .catch(error => {
          console.log({ error });
        });
    });

  parseDate = date => {
    const year = date.getFullYear();
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${year}, ${day} ${month}, ${hour}:${minute}`;
  };

  handleEdit = () => {
    console.log('clicked on edit');
    // save character to redux
    const { setCharacterToStore, history } = this.props;
    const { character } = this.state;
    setCharacterToStore(character);
    // navigate to character generator
    history.push('/character-creator');
  };

  handleDelete = () => {
    const { db } = firebase;
    const { charactername } = this.props.match.params;
    const { history } = this.props;
    db.collection('characters')
      .doc(charactername)
      .delete()
      .then(() => {
        console.log('Document deleted');
        history.push('/characters-list');
      })
      .catch(error => {
        console.log('An error occured while deleting', error);
        this.setState(state => ({
          ...state,
          deleteError: 'A problem occured while deleting the character',
        }));
      });
  };

  savePDF = () => {
    const { name } = this.state.character;
    const doc = new JSPdf();
    const result = document.querySelector('.character-creator__preview-wrapper');
    let imgData;
    if (result) {
      html2canvas(result).then(canvas => {
        imgData = canvas.toDataURL('image/jpeg');
        doc.addImage(imgData, 'JPEG', 15, 40, 180, 180);
        doc.save(`${name}.pdf`);
      });
    }
  };

  calculateAC = () => {
    const { chosenArmor, characterClass, attributes } = this.state.character;
    const armorsArray = [...classInfo[characterClass].equipment.armor];
    if (chosenArmor.length) {
      armorsArray.push(chosenArmor);
    }
    let ac = 10;
    let hasArmor = false;
    armorsArray.forEach(armor => {
      if (armor !== 'shield') {
        ac =
          armorsInfo[armor].baseAC + Math.min(armorsInfo[armor].modifierLimit, Math.floor((attributes.dex - 10) / 2));
        hasArmor = true;
      }
    });
    if (armorsArray.includes('shield')) {
      ac += 2;
    }
    if (!hasArmor) {
      ac += Math.floor((attributes.dex - 10) / 2);
    }
    return ac;
  };

  calculateHP = () => {
    const { level, characterClass, attributes } = this.state.character;
    console.log({ level });
    const conModifier = Math.floor((attributes.con - 10) / 2);
    const baseHP = parseInt(classInfo[characterClass].hitDice.substr(1), 10);
    let hp = baseHP + conModifier;
    for (let i = 0; i < level - 1; i += 1) {
      hp += this.rollHP(baseHP) + conModifier;
    }
    return hp;
  };

  rollHP = hitDie => Math.floor(Math.random() * hitDie) + 1;

  calculateSavingBonus = attribute => {
    const { characterClass, level } = this.state.character;
    const attributeValue = this.state.character.attributes[attribute];
    let bonus = Math.floor((attributeValue - 10) / 2);
    if (characterClass.length && classInfo[characterClass].savingThrows[attribute]) {
      bonus += getProfiencyBonus(level);
    }
    return bonus;
  };

  calculateSkillBonus = skillName => {
    const { skills, level } = this.state.character;
    const attributeValue = this.state.character.attributes[skillAttributes[skillName].attribute];
    let bonus = Math.floor((attributeValue - 10) / 2);
    if (skills.includes(skillName)) {
      bonus += getProfiencyBonus(level);
    }
    return bonus;
  };

  render() {
    const { character, error } = this.state;
    const { authUser } = this.props;
    const {
      name,
      characterClass,
      level,
      race,
      alignment,
      attributes,
      skills,
      chosenWeapon,
      chosenArmor,
      chosenPack,
      languages,
    } = character;

    const attributesSign = {
      str: attributes.str < 10 ? '' : '+',
      dex: attributes.dex < 10 ? '' : '+',
      con: attributes.con < 10 ? '' : '+',
      int: attributes.int < 10 ? '' : '+',
      wis: attributes.wis < 10 ? '' : '+',
      cha: attributes.cha < 10 ? '' : '+',
    };

    return (
      <div className="monster-page">
        {error && (
          <div className="monster-page__error">
            <h1>{error}</h1>
          </div>
        )}
        {!error &&
          character && (
            <div className="monster-page__buttons-container">
              {authUser &&
                authUser.uid === character.userId && (
                  <button className="monster-page__button" onClick={this.handleEdit}>
                    Edit
                  </button>
                )}
              {authUser &&
                authUser.uid === character.userId && (
                  <button className="monster-page__button" onClick={this.handleDelete}>
                    Delete
                  </button>
                )}
              <button className="monster-page__button" onClick={this.savePDF}>
                Download PDF
              </button>
            </div>
          )}
        {!error && character.name ? (
          <div className="character-page__preview-container">
            <div className="character-creator__preview-wrapper character-page__preview-wrapper">
              <div className="character-creator__info-wrapper">
                <div className="character-creator__name-wrapper">
                  <div className="character-creator__name">{name}</div>
                  <div className="character-creator__info-label">Character Name</div>
                </div>
                <div className="character-creator__info-flex-container">
                  <div className="character-creator__info-flex-element">
                    <div className="character-creator__info-container">
                      <div className="character-creator__info">{characterClass}</div>
                      <div className="character-creator__info-label">Class</div>
                    </div>
                    <div className="character-creator__info-container">
                      <div className="character-creator__info">{level}</div>
                      <div className="character-creator__info-label">Level</div>
                    </div>
                  </div>
                  <div className="character-creator__info-flex-element">
                    <div className="character-creator__info-container">
                      <div className="character-creator__info">{race}</div>
                      <div className="character-creator__info-label">Race</div>
                    </div>
                    <div className="character-creator__info-container">
                      <div className="character-creator__info">{alignment}</div>
                      <div className="character-creator__info-label">Alignment</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="character-creator__ability-container">
                <div className="character-creator__ability-wrapper">
                  <p className="character-creator__attribute ">Str</p>
                  <span className="character-creator__str character-creator__classes">
                    {`${attributes.str} (${attributesSign.str}${Math.floor((attributes.str - 10) / 2)})`}
                  </span>
                </div>
                <div className="character-creator__ability-wrapper">
                  <p className="character-creator__attribute">Dex</p>
                  <span className="character-creator__dex character-creator__classes">
                    {`${attributes.dex} (${attributesSign.dex}${Math.floor((attributes.dex - 10) / 2)})`}
                  </span>
                </div>
                <div className="character-creator__ability-wrapper">
                  <p className="character-creator__attribute">Con</p>
                  <span className="character-creator__con character-creator__classes">
                    {`${attributes.con} (${attributesSign.con}${Math.floor((attributes.con - 10) / 2)})`}
                  </span>
                </div>
                <div className="character-creator__ability-wrapper">
                  <p className="character-creator__attribute">Int</p>
                  <span className="character-creator__int character-creator__classes">
                    {`${attributes.int} (${attributesSign.int}${Math.floor((attributes.int - 10) / 2)})`}
                  </span>
                </div>
                <div className="character-creator__ability-wrapper">
                  <p className="character-creator__attribute">Wis</p>
                  <span className="character-creator__wis character-creator__classes">
                    {`${attributes.wis} (${attributesSign.wis}${Math.floor((attributes.wis - 10) / 2)})`}
                  </span>
                </div>
                <div className="character-creator__ability-wrapper">
                  <p className="character-creator__attribute">Cha</p>
                  <span className="character-creator__cha character-creator__classes">
                    {`${attributes.cha} (${attributesSign.cha}${Math.floor((attributes.cha - 10) / 2)})`}
                  </span>
                </div>
              </div>

              <div className="character-creator__ability-container">
                <div className="character-creator__ability-wrapper">
                  <p className="character-creator__attribute ">AC</p>
                  <span className="character-creator__str character-creator__classes">{this.calculateAC()}</span>
                </div>
                <div className="character-creator__ability-wrapper">
                  <p className="character-creator__attribute">Initiative</p>
                  <span className="character-creator__dex character-creator__classes">
                    {`${attributesSign.dex}${Math.floor((attributes.dex - 10) / 2)}`}
                  </span>
                </div>
                <div className="character-creator__ability-wrapper">
                  <p className="character-creator__attribute">Speed</p>
                  <span className="character-creator__con character-creator__classes">{raceInfo[race].speed}</span>
                </div>
                <div className="character-creator__ability-wrapper">
                  <p className="character-creator__attribute">HP</p>
                  <span className="character-creator__int character-creator__classes">{this.calculateHP()}</span>
                </div>{' '}
                <div className="character-creator__ability-wrapper">
                  <p className="character-creator__attribute">Hit Dice</p>
                  <span className="character-creator__int character-creator__classes">
                    {level}
                    {classInfo[characterClass].hitDice}
                  </span>
                </div>
              </div>

              <div className="character-creator__flex-container">
                <div className="character-creator__savings-container">
                  {attributeNames.map((attributeName, index) => (
                    <div className="character-creator__saving-skill-wrapper">
                      <div
                        className={`character-creator__check ${
                          classInfo[characterClass].savingThrows[shortAttributes[index]] ? 'checked' : null
                        }`}
                      />
                      <div className="character-creator__saving-skill-value">
                        {this.calculateSavingBonus(shortAttributes[index])}
                      </div>
                      <div className="character-creator__saving-skill-name">{attributeName}</div>
                    </div>
                  ))}
                  <div className="character-creator__saving-skill-title">Saving Throws</div>
                </div>

                <div className="character-creator__skills-container">
                  {skillNames.map(skillName => (
                    <div className="character-creator__saving-skill-wrapper">
                      <div className={`character-creator__check ${skills.includes(skillName) ? 'checked' : null}`} />
                      <div className="character-creator__saving-skill-value">{this.calculateSkillBonus(skillName)}</div>
                      <div className="character-creator__saving-skill-name">{skillName}</div>
                    </div>
                  ))}
                  <div className="character-creator__saving-skill-title">Skills</div>
                </div>
              </div>

              <div className="character-creator__flex-container">
                <div className="character-creator__proficiencies-container">
                  <div>
                    <p className="character-creator__proficiency">
                      <span>Armor:</span> {classInfo[characterClass].proficiencies.armor}
                    </p>
                    <p className="character-creator__proficiency">
                      <span>Weapons:</span> {classInfo[characterClass].proficiencies.weapons}
                    </p>
                    <p className="character-creator__proficiency">
                      <span>Tools:</span> {classInfo[characterClass].proficiencies.tools}
                    </p>
                    <p className="character-creator__proficiency">
                      <span>Languages:</span> {languages}
                    </p>
                  </div>
                  <div className="character-creator__saving-skill-title">Other Proficiencies & Languages</div>
                </div>
                <div className="character-creator__equipment">
                  <div>
                    <p className="character-creator__proficiency">
                      <span>Weapons:</span> {chosenWeapon.length ? `${chosenWeapon},` : null}{' '}
                      {classInfo[characterClass].equipment.weapons.join(', ')}
                    </p>
                    <p className="character-creator__proficiency">
                      <span>Armor:</span> {chosenArmor.length ? `${armorsInfo[chosenArmor].name},` : null}{' '}
                      {classInfo[characterClass].equipment.armor.length
                        ? classInfo[characterClass].equipment.armor.map(armor => armorsInfo[armor].name).join(', ')
                        : null}
                    </p>
                    <p className="character-creator__proficiency">
                      <span>Pack:</span> {chosenPack.length ? `${chosenPack} (${packsInfo[chosenPack]}),` : null}{' '}
                      {classInfo[characterClass].equipment.pack.map(pack => `${pack} (${packsInfo[pack]})`).join(', ')}
                    </p>
                    <p className="character-creator__proficiency">
                      <span>Other:</span> {classInfo[characterClass].equipment.other}
                    </p>
                  </div>
                  <div className="character-creator__saving-skill-title">Equipment</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          !error && <h1>Loading...</h1>
        )}
      </div>
    );
  }
}

CharacterPage.propTypes = {
  match: PropTypes.shape().isRequired,
  authUser: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  setCharacterToStore: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authUser: state.authUser,
});

const mapDispatchToProps = dispatch => ({
  setCharacterToStore: character => dispatch(setCharacter(character)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CharacterPage)
);
