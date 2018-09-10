import React, { Component } from 'react';
import JSPdf from 'jspdf';
import html2canvas from 'html2canvas';
import InformationalModal from '../../components/InformationalModal/InformationalModal';

import {
  officialClasses,
  officialRaces,
  alignments,
  shortAttributes,
  attributeNames,
  skillNames,
  skillAttributes,
} from '../../copy/general';
import { raceInfo, classInfo, weaponsInfo, armorsInfo, packsInfo } from '../../copy/characterOptions';
import { getProfiencyBonus } from '../../utils';

import './_characterCreatorPage.scss';

import rollIcon from '../../assets/icons/diceRoll.svg';

class CharacterComponentPage extends Component {
  state = {
    modalIsOpen: false,
    modalContent: null,
    name: "Character's name",
    characterClass: 'barbarian',
    level: '1',
    race: 'dragonborn',
    alignment: 'lawful good',
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
    languages: '',
  };

  setSkills = event => {
    const { value } = event.target;
    const { skills, characterClass } = this.state;
    const index = skills.findIndex(el => el === value);
    if (index >= 0) {
      skills.splice(index, 1);
    } else if (skills.length < classInfo[characterClass].skills.choose) {
      skills.push(value);
      skills.sort();
    }
    this.setState(state => ({
      ...state,
      skills,
    }));
  };

  handleInputChange = event => {
    const { value } = event.target;
    let attribute = null;
    switch (event.target.id) {
      case 'input-name':
        attribute = 'name';
        break;
      case 'input-class':
        attribute = 'characterClass';
        break;
      case 'input-level':
        attribute = 'level';
        break;
      case 'input-race':
        attribute = 'race';
        break;
      case 'input-subrace':
        attribute = 'subRace';
        break;
      case 'input-alignment':
        attribute = 'alignment';
        break;
      case 'input-languages':
        attribute = 'languages';
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

  randomizeStats = () => {
    const rolls = shortAttributes.map(() => {
      const rollsArray = [this.rollDice(), this.rollDice(), this.rollDice(), this.rollDice()];
      const minRoll = Math.min(...rollsArray);
      const indexOfMin = rollsArray.indexOf(minRoll);
      if (indexOfMin !== -1) {
        rollsArray.splice(indexOfMin, 1);
      }
      const finalRoll = rollsArray.reduce((a, b) => a + b, 0);
      return finalRoll;
    });

    this.setState(state => ({
      ...state,
      attributes: {
        str: rolls[0],
        dex: rolls[1],
        con: rolls[2],
        int: rolls[3],
        wis: rolls[4],
        cha: rolls[5],
      },
    }));
  };

  rollDice = () => Math.floor(Math.random() * 6) + 1;

  rollHP = hitDie => Math.floor(Math.random() * hitDie) + 1;

  chooseWeapon = event => {
    const { value } = event.target;
    this.setState(state => ({
      ...state,
      chosenWeapon: value,
    }));
  };

  chooseArmor = event => {
    const { value } = event.target;
    this.setState(state => ({
      ...state,
      chosenArmor: value,
    }));
  };

  choosePack = event => {
    const { value } = event.target;
    this.setState(state => ({
      ...state,
      chosenPack: value,
    }));
  };

  calculateSavingBonus = attribute => {
    const { characterClass, level } = this.state;
    const attributeValue = this.state.attributes[attribute];
    let bonus = Math.floor((attributeValue - 10) / 2);
    if (characterClass.length && classInfo[characterClass].savingThrows[attribute]) {
      bonus += getProfiencyBonus(level);
    }
    return bonus;
  };

  calculateSkillBonus = skillName => {
    const { skills, level } = this.state;
    const attributeValue = this.state.attributes[skillAttributes[skillName].attribute];
    let bonus = Math.floor((attributeValue - 10) / 2);
    if (skills.includes(skillName)) {
      bonus += getProfiencyBonus(level);
    }
    return bonus;
  };

  calculateAC = () => {
    const { chosenArmor, characterClass, attributes } = this.state;
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
    const { level, characterClass, attributes } = this.state;
    console.log({ level });
    const conModifier = Math.floor((attributes.con - 10) / 2);
    const baseHP = parseInt(classInfo[characterClass].hitDice.substr(1), 10);
    let hp = baseHP + conModifier;
    for (let i = 0; i < level - 1; i += 1) {
      hp += this.rollHP(baseHP) + conModifier;
    }
    return hp;
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

  savePDF = () => {
    const { name } = this.state;
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

  render() {
    const {
      modalIsOpen,
      modalContent,
      name,
      level,
      attributes,
      race,
      characterClass,
      skills,
      alignment,
      languages,
      chosenWeapon,
      chosenArmor,
      chosenPack,
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
      <div className="character-creator">
        <InformationalModal isOpen={modalIsOpen} toggleFunc={this.toggleModal} content={modalContent} />
        <div className="character-creator__form-wrapper">
          <form onSubmit={event => event.preventDefault()}>
            <div className="character-creator__input-wrapper">
              <label htmlFor="input-name">Character&apos;s name: </label>
              <input
                id="input-name"
                type="text"
                className="character-creator__input-text"
                value={name}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="character-creator__separator" />

            <div className="character-creator__input-wrapper">
              <label htmlFor="input-class">Class: </label>
              <select id="input-class" className="character-creator__input-select" onChange={this.handleInputChange}>
                {officialClasses.map(cls => (
                  <option value={cls} selected={cls === this.state.characterClass}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>

            <div className="character-creator__separator" />

            <div className="character-creator__input-wrapper">
              <label htmlFor="input-level">Character&apos;s level: </label>
              <input
                id="input-level"
                type="number"
                className="character-creator__input-number"
                min="1"
                max="20"
                value={level}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="character-creator__separator" />

            <div className="character-creator__input-wrapper">
              <label htmlFor="input-race">Race: </label>
              <select id="input-race" className="character-creator__input-select" onChange={this.handleInputChange}>
                {officialRaces.map(race => (
                  <option value={race} selected={race === this.state.race}>
                    {race}
                  </option>
                ))}
              </select>
            </div>

            {raceInfo[race].subRaces && (
              <div>
                <div className="character-creator__separator" />
                <div className="character-creator__input-wrapper">
                  <label htmlFor="input-subrace">Subrace: </label>
                  <select
                    id="input-subrace"
                    className="character-creator__input-select"
                    onChange={this.handleInputChange}
                  >
                    {raceInfo[race].subRaces.map(subrace => (
                      <option value={subrace.name} selected={subrace === this.state.subRace}>
                        {subrace.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div className="character-creator__separator" />

            <div className="character-creator__input-wrapper">
              <label htmlFor="input-alignment">Alignment: </label>
              <select
                id="input-alignment"
                className="character-creator__input-select"
                onChange={this.handleInputChange}
              >
                {alignments.slice(2).map(alignment => (
                  <option value={alignment} selected={alignment === this.state.alignment}>
                    {alignment}
                  </option>
                ))}
              </select>
            </div>

            <div className="character-creator__separator" />

            <p className="monster-creator__section-title">
              Ability Scores:{' '}
              <div
                className="character-creator__dice-icon-container"
                onClick={this.randomizeStats}
                onKeyDown={() => null}
                role="button"
                tabIndex={0}
              >
                <img className="character-creator__dice-icon" src={rollIcon} alt="dice roll icon" />
              </div>
            </p>
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

            <div className="character-creator__separator" />

            <div className="character-creator__input-wrapper">
              <label htmlFor="skills">
                Choose {classInfo[characterClass].skills.choose} Skills granted by your class:{' '}
              </label>
              <fieldset id="skills">
                {classInfo[characterClass].skills.from.map(skill => (
                  <div className="character-creator__checkbox-wrapper">
                    <input
                      type="checkbox"
                      value={skill}
                      name="skills"
                      id={`skill-${skill}`}
                      onClick={this.setSkills}
                      checked={skills.includes(skill)}
                    />
                    <label htmlFor={`skill-${skill}`}>{skill}</label>
                  </div>
                ))}
              </fieldset>
            </div>

            <div className="character-creator__separator" />

            {classInfo[characterClass].weaponChoices.length ? (
              <div>
                <div className="character-creator__input-wrapper">
                  <label htmlFor="weapon">Choose one weapon granted by your class: </label>
                  <fieldset id="weapon">
                    {classInfo[characterClass].weaponChoices.map(weapon => (
                      <div>
                        <input
                          type="radio"
                          value={weapon}
                          name="weapon"
                          id={`weapon-${weapon}`}
                          onClick={this.chooseWeapon}
                        />
                        <label htmlFor={`weapon-${weapon}`}>
                          {weapon} ({weaponsInfo[weapon].damage} {weaponsInfo[weapon].type} damage)
                        </label>
                      </div>
                    ))}
                  </fieldset>
                </div>
                <div className="character-creator__separator" />
              </div>
            ) : null}

            {classInfo[characterClass].armorChoices.length ? (
              <div>
                <div className="character-creator__input-wrapper">
                  <label htmlFor="armor">Choose one armor granted by your class: </label>
                  <fieldset id="armor">
                    {classInfo[characterClass].armorChoices.map(armor => (
                      <div>
                        <input
                          type="radio"
                          value={armor}
                          name="armor"
                          id={`armor-${armor}`}
                          onClick={this.chooseArmor}
                        />
                        <label htmlFor={`armor-${armor}`}>{armorsInfo[armor].name}</label>
                      </div>
                    ))}
                  </fieldset>
                </div>
                <div className="character-creator__separator" />
              </div>
            ) : null}

            {classInfo[characterClass].packChoices.length ? (
              <div>
                <div className="character-creator__input-wrapper">
                  <label htmlFor="pack">Choose one pack granted by your class: </label>
                  <fieldset id="pack">
                    {classInfo[characterClass].packChoices.map(pack => (
                      <div>
                        <input type="radio" value={pack} name="pack" id={`pack-${pack}`} onClick={this.choosePack} />
                        <label htmlFor={`pack-${pack}`}>{pack}</label>
                      </div>
                    ))}
                  </fieldset>
                </div>
                <div className="character-creator__separator" />
              </div>
            ) : null}

            <div className="character-creator__input-wrapper">
              <label htmlFor="input-languages">Known Languages: </label>
              <input
                id="input-languages"
                type="text"
                className="character-creator__input-text"
                value={languages}
                onChange={this.handleInputChange}
              />
            </div>
            <button className="monster-creator__button margin-right" onClick={this.handleSave}>
              Save
            </button>
            <button className="monster-creator__button" onClick={this.savePDF}>
              Download PDF
            </button>
          </form>
        </div>
        <div className="character-creator__preview-wrapper">
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
    );
  }
}

export default CharacterComponentPage;
