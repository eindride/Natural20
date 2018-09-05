import React from 'react';
import JSPdf from 'jspdf';
import html2canvas from 'html2canvas';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebase } from '../../firebase/index';

import InformationalModal from '../../components/InformationalModal/InformationalModal';
import InfoButton from '../../components/InfoButton/InfoButton';
import monsterInfoCopy from '../../copy/creatureInfo';

import {
  damageTypes,
  conditions,
  challengeRating,
  creatureSizes,
  creatureTypes,
  alignments,
  shortAttributes,
  skillNames,
} from '../../copy/general';
import './_monsterCreatorPage.scss';

class MonsterCreatorPage extends React.Component {
  state = {
    name: "Monster's name",
    size: '',
    type: '',
    alignment: '',
    ac: 0,
    armor: '',
    hp: 0,
    hitDice: '',
    speed: {
      burrow: 0,
      climb: 0,
      fly: 0,
      swim: 0,
      walk: 0,
    },
    attributes: {
      str: 10,
      dex: 10,
      con: 10,
      int: 10,
      wis: 10,
      cha: 10,
    },
    savingThrows: {
      str: 0,
      dex: 0,
      con: 0,
      int: 0,
      wis: 0,
      cha: 0,
    },
    skills: {
      acrobatics: 0,
      'animal handling': 0,
      arcana: 0,
      athletics: 0,
      deception: 0,
      history: 0,
      insight: 0,
      intimidation: 0,
      investigation: 0,
      medicine: 0,
      nature: 0,
      perception: 0,
      performance: 0,
      persuasion: 0,
      religion: 0,
      'sleight of Hand': 0,
      stealth: 0,
      survival: 0,
    },
    vulnerabilities: [],
    damageResistances: [],
    damageImmunities: [],
    conditionImmunities: [],
    blindsight: 0,
    darkvision: 0,
    lowLightVision: 0,
    tremorsense: 0,
    truesight: 0,
    passivePerception: 0,
    languages: '',
    challenge: 0,
    modalIsOpen: false,
  };

  setVulnerability = event => {
    const { value } = event.target;
    const { vulnerabilities } = this.state;
    const index = vulnerabilities.findIndex(el => el === value);
    if (index >= 0) {
      vulnerabilities.splice(index, 1);
    } else {
      vulnerabilities.push(value);
      vulnerabilities.sort();
    }
    this.setState(state => ({
      ...state,
      vulnerabilities,
    }));
  };

  setDamageResistances = event => {
    const { value } = event.target;
    const { damageResistances } = this.state;
    const index = damageResistances.findIndex(el => el === value);
    if (index >= 0) {
      damageResistances.splice(index, 1);
    } else {
      damageResistances.push(value);
      damageResistances.sort();
    }
    this.setState(state => ({
      ...state,
      damageResistances,
    }));
  };

  setDamageImmunities = event => {
    const { value } = event.target;
    const { damageImmunities } = this.state;
    const index = damageImmunities.findIndex(el => el === value);
    if (index >= 0) {
      damageImmunities.splice(index, 1);
    } else {
      damageImmunities.push(value);
      damageImmunities.sort();
    }
    this.setState(state => ({
      ...state,
      damageImmunities,
    }));
  };

  setConditions = event => {
    const { value } = event.target;
    const { conditionImmunities } = this.state;
    const index = conditionImmunities.findIndex(el => el === value);
    if (index >= 0) {
      conditionImmunities.splice(index, 1);
    } else {
      conditionImmunities.push(value);
      conditionImmunities.sort();
    }
    this.setState(state => ({
      ...state,
      conditionImmunities,
    }));
  };

  handleInputChange = event => {
    const { value } = event.target;
    let attribute = null;
    switch (event.target.id) {
      case 'input-name':
        attribute = 'name';
        break;
      case 'input-size':
        attribute = 'size';
        break;
      case 'input-type':
        attribute = 'type';
        break;
      case 'input-alignment':
        attribute = 'alignment';
        break;
      case 'input-ac':
        attribute = 'ac';
        break;
      case 'input-armor':
        attribute = 'armor';
        break;
      case 'input-hp':
        attribute = 'hp';
        break;
      case 'input-hit-dice':
        attribute = 'hitDice';
        break;
      case 'input-blindsight':
        attribute = 'blindsight';
        break;
      case 'input-darkvision':
        attribute = 'darkvision';
        break;
      case 'input-lowlight':
        attribute = 'lowLightVision';
        break;
      case 'input-tremorsense':
        attribute = 'tremorsense';
        break;
      case 'input-truesight':
        attribute = 'truesight';
        break;
      case 'input-passive':
        attribute = 'passivePerception';
        break;
      case 'input-languages':
        attribute = 'languages';
        break;
      case 'input-challenge':
        attribute = 'challenge';
        break;
      default:
        return;
    }
    if (attribute) {
      this.setState(state => ({
        ...state,
        [attribute]: value,
      }));
    }
  };

  handleSpeedChange = event => {
    const { value } = event.target;
    switch (event.target.id) {
      case 'input-walking-speed':
        this.setState(state => ({
          ...state,
          speed: {
            ...state.speed,
            walk: value,
          },
        }));
        break;
      case 'input-flying-speed':
        this.setState(state => ({
          ...state,
          speed: {
            ...state.speed,
            fly: value,
          },
        }));
        break;
      case 'input-swiming-speed':
        this.setState(state => ({
          ...state,
          speed: {
            ...state.speed,
            swim: value,
          },
        }));
        break;
      case 'input-climbing-speed':
        this.setState(state => ({
          ...state,
          speed: {
            ...state.speed,
            climb: value,
          },
        }));
        break;
      case 'input-burrowing-speed':
        this.setState(state => ({
          ...state,
          speed: {
            ...state.speed,
            burrow: value,
          },
        }));
        break;
      default:
    }
  };

  handleAttributeChange = event => {
    const { value } = event.target;
    switch (event.target.id) {
      case 'input-str':
        this.setState(state => ({
          ...state,
          attributes: {
            ...state.attributes,
            str: value,
          },
        }));
        break;
      case 'input-dex':
        this.setState(state => ({
          ...state,
          attributes: {
            ...state.attributes,
            dex: value,
          },
        }));
        break;
      case 'input-con':
        this.setState(state => ({
          ...state,
          attributes: {
            ...state.attributes,
            con: value,
          },
        }));
        break;
      case 'input-int':
        this.setState(state => ({
          ...state,
          attributes: {
            ...state.attributes,
            int: value,
          },
        }));
        break;
      case 'input-wis':
        this.setState(state => ({
          ...state,
          attributes: {
            ...state.attributes,
            wis: value,
          },
        }));
        break;
      case 'input-cha':
        this.setState(state => ({
          ...state,
          attributes: {
            ...state.attributes,
            cha: value,
          },
        }));
        break;
      default:
    }
  };

  handleSavingThrowsChange = event => {
    const value = parseInt(event.target.value, 10);
    switch (event.target.id) {
      case 'input-saving-str':
        this.setState(state => ({
          ...state,
          savingThrows: {
            ...state.savingThrows,
            str: value,
          },
        }));
        break;
      case 'input-saving-dex':
        this.setState(state => ({
          ...state,
          savingThrows: {
            ...state.savingThrows,
            dex: value,
          },
        }));
        break;
      case 'input-saving-con':
        this.setState(state => ({
          ...state,
          savingThrows: {
            ...state.savingThrows,
            con: value,
          },
        }));
        break;
      case 'input-saving-int':
        this.setState(state => ({
          ...state,
          savingThrows: {
            ...state.savingThrows,
            int: value,
          },
        }));
        break;
      case 'input-saving-wis':
        this.setState(state => ({
          ...state,
          savingThrows: {
            ...state.savingThrows,
            wis: value,
          },
        }));
        break;
      case 'input-saving-cha':
        this.setState(state => ({
          ...state,
          savingThrows: {
            ...state.savingThrows,
            cha: value,
          },
        }));
        break;
      default:
    }
  };

  handleSkillsChange = event => {
    const value = parseInt(event.target.value, 10);
    switch (event.target.id) {
      case 'input-acrobatics':
        this.setState(state => ({
          ...state,
          skills: {
            ...state.skills,
            acrobatics: value,
          },
        }));
        break;
      case 'input-animal-handling':
        this.setState(state => ({
          ...state,
          skills: {
            ...state.skills,
            'animal handling': value,
          },
        }));
        break;
      case 'input-arcana':
        this.setState(state => ({
          ...state,
          skills: {
            ...state.skills,
            arcana: value,
          },
        }));
        break;
      case 'input-athletics':
        this.setState(state => ({
          ...state,
          skills: {
            ...state.skills,
            athletics: value,
          },
        }));
        break;
      case 'input-deception':
        this.setState(state => ({
          ...state,
          skills: {
            ...state.skills,
            deception: value,
          },
        }));
        break;
      case 'input-history':
        this.setState(state => ({
          ...state,
          skills: {
            ...state.skills,
            history: value,
          },
        }));
        break;
      case 'input-insight':
        this.setState(state => ({
          ...state,
          skills: {
            ...state.skills,
            insight: value,
          },
        }));
        break;
      case 'input-intimidation':
        this.setState(state => ({
          ...state,
          skills: {
            ...state.skills,
            intimidation: value,
          },
        }));
        break;
      case 'input-investigation':
        this.setState(state => ({
          ...state,
          skills: {
            ...state.skills,
            investigation: value,
          },
        }));
        break;
      case 'input-medicine':
        this.setState(state => ({
          ...state,
          skills: {
            ...state.skills,
            medicine: value,
          },
        }));
        break;
      case 'input-nature':
        this.setState(state => ({
          ...state,
          skills: {
            ...state.skills,
            nature: value,
          },
        }));
        break;
      case 'input-perception':
        this.setState(state => ({
          ...state,
          skills: {
            ...state.skills,
            perception: value,
          },
        }));
        break;
      case 'input-performance':
        this.setState(state => ({
          ...state,
          skills: {
            ...state.skills,
            performance: value,
          },
        }));
        break;
      case 'input-persuasion':
        this.setState(state => ({
          ...state,
          skills: {
            ...state.skills,
            persuasion: value,
          },
        }));
        break;
      case 'input-religion':
        this.setState(state => ({
          ...state,
          skills: {
            ...state.skills,
            religion: value,
          },
        }));
        break;
      case 'input-sleight':
        this.setState(state => ({
          ...state,
          skills: {
            ...state.skills,
            sleight: value,
          },
        }));
        break;
      case 'input-stealth':
        this.setState(state => ({
          ...state,
          skills: {
            ...state.skills,
            stealth: value,
          },
        }));
        break;
      case 'input-survival':
        this.setState(state => ({
          ...state,
          skills: {
            ...state.skills,
            survival: value,
          },
        }));
        break;
      default:
    }
  };

  toggleModal = () => {
    this.setState(state => ({
      ...state,
      modalIsOpen: !state.modalIsOpen,
    }));
  };

  displaySavingThrows = () => {
    const { savingThrows } = this.state;
    const sum = Object.keys(savingThrows)
      .map(key => savingThrows[key])
      .reduce((acc, value) => acc + value);
    if (sum) {
      return (
        <p className="monster-creator__attribute">
          Saving Throws:{' '}
          <span className="monster-creator__attribute-value">
            {Object.keys(savingThrows)
              .map(
                key =>
                  savingThrows[key] !== 0 ? `${key} ${savingThrows[key] > 0 ? '+' : ''}${savingThrows[key]}` : null
              )
              .filter(el => el)
              .join(', ')}
          </span>
        </p>
      );
    }
    return null;
  };

  displaySkills = () => {
    const { skills } = this.state;
    const sum = Object.keys(skills)
      .map(key => skills[key])
      .reduce((acc, value) => acc + value);
    if (sum) {
      return (
        <p className="monster-creator__attribute">
          Skills:{' '}
          <span className="monster-creator__attribute-value">
            {Object.keys(skills)
              .map(key => (skills[key] !== 0 ? `${key} ${skills[key] > 0 ? '+' : ''}${skills[key]}` : null))
              .filter(el => el)
              .join(', ')}
          </span>
        </p>
      );
    }
    return null;
  };

  toggleModal = content => {
    this.setState(state => ({
      ...state,
      modalIsOpen: !state.modalIsOpen,
      modalContent: content,
    }));
  };

  savePDF = () => {
    const { name } = this.state;
    const doc = new JSPdf();
    const result = document.querySelector('.monster-creator__preview-wrapper');
    let imgData;
    if (result) {
      html2canvas(result).then(canvas => {
        imgData = canvas.toDataURL('image/jpeg');
        doc.addImage(imgData, 'JPEG', 15, 40, 180, 180);
        doc.save(`${name}.pdf`);
      });
    }
  };

  handleSave = event => {
    event.preventDefault();
    const { monster } = this.props;
    const { db } = firebase;
    if (monster) {
      // if spell is not null that means this is an edit. so first delete the old doc
      db.collection('monsters')
        .doc(`${monster.name}-${monster.userId}`)
        .delete()
        .then(() => {
          console.log('Old spell was deleted succesfully!');
          this.saveSpell();
        })
        .catch(error => {
          console.log('An error occured whule deleting the old doc', error);
        });
    } else {
      this.saveSpell();
    }
  };

  saveSpell = () => {
    const { db } = firebase;
    const { authUser } = this.props;
    if (authUser) {
      const {
        name,
        size,
        type,
        alignment,
        ac,
        armor,
        hp,
        hitDice,
        speed,
        attributes,
        savingThrows,
        skills,
        vulnerabilities,
        damageResistances,
        damageImmunities,
        conditionImmunities,
        blindsight,
        darkvision,
        lowLightVision,
        tremorsense,
        truesight,
        passivePerception,
        languages,
        challenge,
      } = this.state;
      db.collection('monsters')
        .doc(`${name}-${authUser.uid}`)
        .get()
        .then(doc => {
          if (doc.exists) {
            console.log('already exists');
          } else {
            console.log('available');

            db.collection('monsters')
              .doc(`${name}-${authUser.uid}`)
              .set({
                userId: authUser.uid,
                name,
                size,
                type,
                alignment,
                ac,
                armor,
                hp,
                hitDice,
                speed,
                attributes,
                savingThrows,
                skills,
                vulnerabilities,
                damageResistances,
                damageImmunities,
                conditionImmunities,
                blindsight,
                darkvision,
                lowLightVision,
                tremorsense,
                truesight,
                passivePerception,
                languages,
                challenge,
                creationDate: new Date(),
              })
              .then(() => {
                console.log('Document successfully written!');
                // maybe open a modal here that says succesfull and then redirect
                this.props.history.push('/creatures-list');
              })
              .catch(error => {
                console.error('Error writing document: ', error);
                this.setState(state => ({
                  ...state,
                  error,
                }));
              });
          }
        });
    } else {
      this.setState(state => ({
        ...state,
        error: 'You must be logged in to save your spell!',
      }));
    }
  };

  render() {
    const {
      name,
      size,
      type,
      alignment,
      ac,
      armor,
      hp,
      hitDice,
      speed,
      attributes,
      savingThrows,
      skills,
      vulnerabilities,
      damageResistances,
      damageImmunities,
      conditionImmunities,
      blindsight,
      darkvision,
      lowLightVision,
      tremorsense,
      truesight,
      passivePerception,
      languages,
      challenge,
      modalIsOpen,
      modalContent,
    } = this.state;
    const attributesSign = {
      str: attributes.str < 10 ? '' : '+',
      dex: attributes.dex < 10 ? '' : '+',
      con: attributes.con < 10 ? '' : '+',
      int: attributes.int < 10 ? '' : '+',
      wis: attributes.wis < 10 ? '' : '+',
      cha: attributes.cha < 10 ? '' : '+',
    };

    return (
      <div className="monster-creator">
        <InformationalModal isOpen={modalIsOpen} toggleFunc={this.toggleModal} content={modalContent} />
        <div className="monster-creator__form-wrapper">
          <form onSubmit={event => event.preventDefault()}>
            <div className="monster-creator__input-wrapper">
              <label htmlFor="input-name">Monster&apos;s name: </label>
              <input
                id="input-name"
                type="text"
                className="monster-creator__input-text"
                value={name}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="monster-creator__separator" />

            <div className="monster-creator__input-wrapper">
              <label htmlFor="input-size">Size: </label>
              <select id="input-size" className="monster-creator__input-select" onChange={this.handleInputChange}>
                {creatureSizes.map(size => (
                  <option value={size}>{size}</option>
                ))}
              </select>
              <InfoButton onClick={this.toggleModal} content={monsterInfoCopy.size} />
            </div>

            <div className="monster-creator__separator" />

            <div className="monster-creator__input-wrapper">
              <label htmlFor="input-type">Type: </label>
              <select id="input-type" className="monster-creator__input-select" onChange={this.handleInputChange}>
                {creatureTypes.map(type => (
                  <option value={type}>{type}</option>
                ))}
              </select>
              <InfoButton onClick={this.toggleModal} content={monsterInfoCopy.type} />
            </div>

            <div className="monster-creator__separator" />

            <div className="monster-creator__input-wrapper">
              <label htmlFor="input-alignment">Alignment: </label>
              <select id="input-alignment" className="monster-creator__input-select" onChange={this.handleInputChange}>
                {alignments.map(alignment => (
                  <option value={alignment}>{alignment}</option>
                ))}
              </select>
              <InfoButton onClick={this.toggleModal} content={monsterInfoCopy.alignment} />
            </div>

            <div className="monster-creator__separator" />

            <div className="monster-creator__input-wrapper">
              <label htmlFor="input-ac">Armor Class: </label>
              <input
                id="input-ac"
                type="number"
                className="monster-creator__input-number"
                value={ac}
                min={0}
                max={30}
                onChange={this.handleInputChange}
              />
              <input
                id="input-armor"
                type="text"
                className="monster-creator__input-text"
                value={armor}
                onChange={this.handleInputChange}
              />
              <InfoButton onClick={this.toggleModal} content={monsterInfoCopy.ac} />
            </div>

            <div className="monster-creator__separator" />

            <div className="monster-creator__input-wrapper">
              <label htmlFor="input-hp">Hit Points: </label>
              <input
                id="input-hp"
                type="number"
                className="monster-creator__input-number"
                value={hp}
                onChange={this.handleInputChange}
              />
              <input
                id="input-hit-dice"
                type="text"
                className="monster-creator__input-text"
                value={hitDice}
                onChange={this.handleInputChange}
              />
              <InfoButton onClick={this.toggleModal} content={monsterInfoCopy.hitPoints} />
            </div>

            <div className="monster-creator__separator" />

            <div className="monster-creator__input-wrapper">
              <label htmlFor="input-walking-speed">Walking Speed: </label>
              <input
                id="input-walking-speed"
                type="number"
                className="monster-creator__input-number"
                value={speed.walk}
                min={0}
                onChange={this.handleSpeedChange}
              />
              <InfoButton onClick={this.toggleModal} content={monsterInfoCopy.speed} />
            </div>
            <div className="monster-creator__input-wrapper">
              <label htmlFor="input-flying-speed">Flying Speed: </label>
              <input
                id="input-flying-speed"
                type="number"
                className="monster-creator__input-number"
                value={speed.fly}
                min={0}
                onChange={this.handleSpeedChange}
              />
            </div>
            <div className="monster-creator__input-wrapper">
              <label htmlFor="input-swiming-speed">Swiming Speed: </label>
              <input
                id="input-swiming-speed"
                type="number"
                className="monster-creator__input-number"
                value={speed.swim}
                min={0}
                onChange={this.handleSpeedChange}
              />
            </div>
            <div className="monster-creator__input-wrapper">
              <label htmlFor="input-climning-speed">Climbing Speed: </label>
              <input
                id="input-climbing-speed"
                type="number"
                className="monster-creator__input-number"
                value={speed.climb}
                min={0}
                onChange={this.handleSpeedChange}
              />
            </div>
            <div className="monster-creator__input-wrapper">
              <label htmlFor="input-climning-speed">Burrowing Speed: </label>
              <input
                id="input-burrowing-speed"
                type="number"
                className="monster-creator__input-number"
                value={speed.burrow}
                min={0}
                onChange={this.handleSpeedChange}
              />
            </div>

            <div className="monster-creator__separator" />

            <p className="monster-creator__section-title">Ability Scores:</p>
            <div className="monster-creator__input-wrapper padding-left">
              {shortAttributes.map(attr => (
                <div className="monster-creator__input-wrapper">
                  <label htmlFor="input-str">{attr}: </label>
                  <input
                    id={`input-${attr}`}
                    type="number"
                    className="monster-creator__input-number"
                    value={attributes[attr]}
                    min={0}
                    max={30}
                    onChange={this.handleAttributeChange}
                  />
                </div>
              ))}
            </div>

            <div className="monster-creator__separator" />

            <p className="monster-creator__section-title">Saving Throws:</p>
            <div className="monster-creator__input-wrapper padding-left">
              {shortAttributes.map(attr => (
                <div className="monster-creator__input-wrapper">
                  <label htmlFor={`input-saving-${attr}`}>{attr}: </label>
                  <input
                    id={`input-saving-${attr}`}
                    type="number"
                    className="monster-creator__input-number"
                    value={savingThrows[attr]}
                    min={-30}
                    max={30}
                    onChange={this.handleSavingThrowsChange}
                  />
                </div>
              ))}
              <InfoButton onClick={this.toggleModal} content={monsterInfoCopy.savingThrows} />
            </div>

            <div className="monster-creator__separator" />

            <p className="monster-creator__section-title">Skills:</p>
            <div className="monster-creator__input-wrapper padding-left">
              {skillNames.map(name => {
                let processedName = name;
                if (name === 'animal handling') {
                  processedName = 'animal-handling';
                } else if (name === 'sleight of hand') {
                  processedName = 'sleight';
                }

                return (
                  <div className="monster-creator__input-wrapper">
                    <label htmlFor={`input-${processedName}`}>{name}: </label>
                    <input
                      id={`input-${processedName}`}
                      type="number"
                      className="monster-creator__input-number"
                      value={skills[name]}
                      min={-30}
                      max={30}
                      onChange={this.handleSkillsChange}
                    />
                  </div>
                );
              })}
              <InfoButton onClick={this.toggleModal} content={monsterInfoCopy.skills} />
            </div>

            <div className="monster-creator__separator" />

            <div className="monster-creator__input-wrapper">
              <label htmlFor="vulnerabilities">Vulnerabilities: </label>
              <fieldset id="vulnerabilities">
                {damageTypes.map(type => (
                  <div className="monster-creator__checkbox-wrapper">
                    <input
                      type="checkbox"
                      value={type}
                      name="vulnerabilities"
                      id={`vulnerability-${type}`}
                      onClick={this.setVulnerability}
                    />
                    <label htmlFor={`vulnerability-${type}`}>{type}</label>
                  </div>
                ))}
              </fieldset>
              <InfoButton onClick={this.toggleModal} content={monsterInfoCopy.vulnerabilities} />
            </div>

            <div className="monster-creator__separator" />

            <div className="monster-creator__input-wrapper">
              <label htmlFor="damage-resistances">Damage Resistances: </label>
              <fieldset id="damage-resistances">
                {damageTypes.map(type => (
                  <div className="monster-creator__checkbox-wrapper">
                    <input
                      type="checkbox"
                      value={type}
                      name="damage-resistances"
                      id={`resistance-${type}`}
                      onClick={this.setDamageResistances}
                    />
                    <label htmlFor={`resistance-${type}`}>{type}</label>
                  </div>
                ))}
              </fieldset>
              <InfoButton onClick={this.toggleModal} content={monsterInfoCopy.vulnerabilities} />
            </div>

            <div className="monster-creator__separator" />

            <div className="monster-creator__input-wrapper">
              <label htmlFor="damage-immunities">Damage Immunities: </label>
              <fieldset id="damage-immunities">
                {damageTypes.map(type => (
                  <div className="monster-creator__checkbox-wrapper">
                    <input
                      type="checkbox"
                      value={type}
                      name="damage-immunities"
                      id={`dmg-immunity-${type}`}
                      onClick={this.setDamageImmunities}
                    />
                    <label htmlFor={`dmg-immunity-${type}`}>{type}</label>
                  </div>
                ))}
              </fieldset>
              <InfoButton onClick={this.toggleModal} content={monsterInfoCopy.vulnerabilities} />
            </div>

            <div className="monster-creator__separator" />

            <div className="monster-creator__input-wrapper">
              <label htmlFor="conditions">Condition Immunities: </label>
              <fieldset id="conditions">
                {conditions.map(condition => (
                  <div className="monster-creator__checkbox-wrapper">
                    <input
                      type="checkbox"
                      value={condition}
                      name="conditions"
                      id={`condition-${condition}`}
                      onClick={this.setConditions}
                    />
                    <label htmlFor={`condition-${condition}`}>{condition}</label>
                  </div>
                ))}
              </fieldset>
              <InfoButton onClick={this.toggleModal} content={monsterInfoCopy.vulnerabilities} />
            </div>

            <div className="monster-creator__separator" />

            <div className="monster-creator__input-wrapper">
              <label htmlFor="input-blindsight">Blindsight: </label>
              <input
                id="input-blindsight"
                type="number"
                className="monster-creator__input-text"
                value={blindsight}
                min={0}
                onChange={this.handleInputChange}
              />
              <InfoButton onClick={this.toggleModal} content={monsterInfoCopy.senses} />
            </div>
            <div className="monster-creator__input-wrapper">
              <label htmlFor="input-darkvision">Darkvision: </label>
              <input
                id="input-darkvision"
                type="number"
                className="monster-creator__input-text"
                value={darkvision}
                min={0}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="monster-creator__input-wrapper">
              <label htmlFor="input-lowlight">Low-light vision: </label>
              <input
                id="input-lowlight"
                type="number"
                className="monster-creator__input-text"
                value={lowLightVision}
                min={0}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="monster-creator__input-wrapper">
              <label htmlFor="input-tremorsense">Tremorsense: </label>
              <input
                id="input-tremorsense"
                type="number"
                className="monster-creator__input-text"
                value={tremorsense}
                min={0}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="monster-creator__input-wrapper">
              <label htmlFor="input-truesight">Truesight: </label>
              <input
                id="input-truesight"
                type="number"
                className="monster-creator__input-text"
                value={truesight}
                min={0}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="monster-creator__input-wrapper">
              <label htmlFor="input-passive">Passive Perception: </label>
              <input
                id="input-passive"
                type="number"
                className="monster-creator__input-text"
                value={passivePerception}
                min={0}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="monster-creator__separator" />

            <div className="monster-creator__input-wrapper">
              <label htmlFor="input-languages">Languages: </label>
              <input
                id="input-languages"
                type="text"
                className="monster-creator__input-text"
                value={languages}
                onChange={this.handleInputChange}
              />
              <InfoButton onClick={this.toggleModal} content={monsterInfoCopy.languages} />
            </div>

            <div className="monster-creator__separator" />

            <div className="monster-creator__input-wrapper">
              <label htmlFor="input-challenge">Challenge: </label>
              <select id="input-challenge" className="monster-creator__input-select" onChange={this.handleInputChange}>
                {Object.keys(challengeRating).map(challenge => (
                  <option value={challenge}>{challenge}</option>
                ))}
              </select>
              <InfoButton onClick={this.toggleModal} content={monsterInfoCopy.challenge} />
            </div>
            <button className="monster-creator__button margin-right" onClick={this.handleSave}>
              Save
            </button>
            <button className="monster-creator__button" onClick={this.savePDF}>
              Download PDF
            </button>
          </form>
        </div>
        <div className="monster-creator__preview-wrapper">
          <h3 className="monster-creator__name">{name || "Monster's name"}</h3>
          <p className="monster-creator__sub-info">{`${size} ${type}${alignment && ','} ${alignment}`}</p>
          <div className="monster-creator__separator" />
          <p className="monster-creator__attribute">
            Armor Class: <span className="monster-creator__attribute-value">{`${ac} ${armor && `(${armor})`}`}</span>
          </p>
          <p className="monster-creator__attribute">
            Hit Points: <span className="monster-creator__attribute-value">{`${hp} ${hitDice && `(${hitDice})`}`}</span>
          </p>
          <p className="monster-creator__attribute">
            Speed:{' '}
            <span className="monster-creator__attribute-value">
              {Object.keys(speed)
                .map(key => (speed[key] ? `${key} ${speed[key]} ft.` : null))
                .filter(el => el)
                .join(', ')}
            </span>
          </p>
          <div className="monster-creator__separator" />
          <div className="monster-creator__ability-container">
            <div className="monster-creator__ability-wrapper">
              <p className="monster-creator__attribute ">Str</p>
              <span className="monster-creator__str monster-creator__classes">
                {`${attributes.str} (${attributesSign.str}${Math.floor((attributes.str - 10) / 2)})`}
              </span>
            </div>
            <div className="monster-creator__ability-wrapper">
              <p className="monster-creator__attribute">Dex</p>
              <span className="monster-creator__dex monster-creator__classes">
                {`${attributes.dex} (${attributesSign.dex}${Math.floor((attributes.dex - 10) / 2)})`}
              </span>
            </div>
            <div className="monster-creator__ability-wrapper">
              <p className="monster-creator__attribute">Con:</p>
              <span className="monster-creator__con monster-creator__classes">
                {`${attributes.con} (${attributesSign.con}${Math.floor((attributes.con - 10) / 2)})`}
              </span>
            </div>
            <div className="monster-creator__ability-wrapper">
              <p className="monster-creator__attribute">Int</p>
              <span className="monster-creator__int monster-creator__classes">
                {`${attributes.int} (${attributesSign.int}${Math.floor((attributes.int - 10) / 2)})`}
              </span>
            </div>
            <div className="monster-creator__ability-wrapper">
              <p className="monster-creator__attribute">Wis</p>
              <span className="monster-creator__wis monster-creator__classes">
                {`${attributes.wis} (${attributesSign.wis}${Math.floor((attributes.wis - 10) / 2)})`}
              </span>
            </div>
            <div className="monster-creator__ability-wrapper">
              <p className="monster-creator__attribute">Cha</p>
              <span className="monster-creator__cha monster-creator__classes">
                {`${attributes.cha} (${attributesSign.cha}${Math.floor((attributes.cha - 10) / 2)})`}
              </span>
            </div>
          </div>
          <div className="monster-creator__separator" />
          {this.displaySavingThrows()}
          {this.displaySkills()}
          {vulnerabilities.length ? (
            <p className="monster-creator__attribute">
              Vulnerabilities: <span className="monster-creator__attribute-value">{vulnerabilities.join(', ')}</span>
            </p>
          ) : null}
          {damageResistances.length ? (
            <p className="monster-creator__attribute">
              Damage Resistances:{' '}
              <span className="monster-creator__attribute-value">{damageResistances.join(', ')}</span>
            </p>
          ) : null}
          {damageImmunities.length ? (
            <p className="monster-creator__attribute">
              Damage Immunities: <span className="monster-creator__attribute-value">{damageImmunities.join(', ')}</span>
            </p>
          ) : null}
          {conditionImmunities.length ? (
            <p className="monster-creator__attribute">
              Condition Immunities:{' '}
              <span className="monster-creator__attribute-value">{conditionImmunities.join(', ')}</span>
            </p>
          ) : null}
          {parseInt(blindsight, 10) ||
          parseInt(darkvision, 10) ||
          parseInt(lowLightVision, 10) ||
          parseInt(lowLightVision, 10) ||
          parseInt(tremorsense, 10) ||
          parseInt(truesight, 10) ||
          parseInt(passivePerception, 10) ? (
            <p className="monster-creator__attribute">
              Senses:{' '}
              <span className="monster-creator__attribute-value">
                {[
                  {
                    name: 'blindsight',
                    value: parseInt(blindsight, 10),
                  },
                  {
                    name: 'darkvision',
                    value: parseInt(darkvision, 10),
                  },
                  {
                    name: 'low-light vision',
                    value: parseInt(lowLightVision, 10),
                  },
                  {
                    name: 'tremorsense',
                    value: parseInt(tremorsense, 10),
                  },
                  {
                    name: 'truesight',
                    value: parseInt(truesight, 10),
                  },
                  {
                    name: 'passivePerception',
                    value: parseInt(passivePerception, 10),
                  },
                ]
                  .map(sense => (sense.value ? `${sense.name} ${sense.value} Ft.` : null))
                  .filter(el => el)
                  .join(', ')}
              </span>
            </p>
          ) : null}
          {languages ? (
            <p className="monster-creator__attribute">
              Languages: <span className="monster-creator__attribute-value">{languages}</span>
            </p>
          ) : null}
          <p className="monster-creator__attribute">
            Challenge:{' '}
            <span className="monster-creator__attribute-value">{`${challenge} (${
              challengeRating[challenge]
            } XP)`}</span>
          </p>
          <div className="monster-creator__separator" />
        </div>
      </div>
    );
  }
}

MonsterCreatorPage.propTypes = {
  monster: PropTypes.shape().isRequired,
  authUser: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  authUser: state.authUser,
  monster: state.spell,
});

export default withRouter(connect(mapStateToProps)(MonsterCreatorPage));
