import React from 'react';

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
        <div className="monster-creator__savings-wrapper">
          {Object.keys(savingThrows)
            .map(
              key => (savingThrows[key] !== 0 ? `${key} ${savingThrows[key] > 0 ? '+' : ''}${savingThrows[key]}` : null)
            )
            .filter(el => el)
            .join(', ')}
        </div>
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
        <div className="monster-creator__savings-wrapper">
          {Object.keys(skills)
            .map(key => (skills[key] !== 0 ? `${key} ${skills[key] > 0 ? '+' : ''}${skills[key]}` : null))
            .filter(el => el)
            .join(', ')}
        </div>
      );
    }
    return null;
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
        <div className="monster-creator__form-wrapper">
          <form>
            <label htmlFor="input-name">Monster&apos;s name: </label>
            <input
              id="input-name"
              type="text"
              className="monster-creator__input--name"
              value={name}
              onChange={this.handleInputChange}
            />
            <label htmlFor="input-size">Size: </label>
            <select id="input-size" className="monster-creator__input--size" onChange={this.handleInputChange}>
              {creatureSizes.map(size => (
                <option value={size}>{size}</option>
              ))}
            </select>
            <label htmlFor="input-type">Type: </label>
            <select id="input-type" className="monster-creator__input--type" onChange={this.handleInputChange}>
              {creatureTypes.map(type => (
                <option value={type}>{type}</option>
              ))}
            </select>
            <label htmlFor="input-alignment">Alignment: </label>
            <select
              id="input-alignment"
              className="monster-creator__input--alignment"
              onChange={this.handleInputChange}
            >
              {alignments.map(alignment => (
                <option value={alignment}>{alignment}</option>
              ))}
            </select>
            <label htmlFor="input-ac">Armor Class: </label>
            <input
              id="input-ac"
              type="number"
              className="monster-creator__input--ac"
              value={ac}
              min={0}
              max={30}
              onChange={this.handleInputChange}
            />
            <input
              id="input-armor"
              type="text"
              className="monster-creator__input--armor"
              value={armor}
              onChange={this.handleInputChange}
            />
            <label htmlFor="input-ac">Hit Points: </label>
            <input
              id="input-hp"
              type="number"
              className="monster-creator__input--hp"
              value={hp}
              onChange={this.handleInputChange}
            />
            <input
              id="input-hit-dice"
              type="text"
              className="monster-creator__input--hit-dice"
              value={hitDice}
              onChange={this.handleInputChange}
            />
            <label htmlFor="input-walking-speed">Walking Speed: </label>
            <input
              id="input-walking-speed"
              type="number"
              className="monster-creator__input--walking-speed"
              value={speed.walk}
              min={0}
              onChange={this.handleInputChange}
            />
            <label htmlFor="input-flying-speed">Flying Speed: </label>
            <input
              id="input-flying-speed"
              type="number"
              className="monster-creator__input--flying-speed"
              value={speed.fly}
              min={0}
              onChange={this.handleInputChange}
            />
            <label htmlFor="input-swiming-speed">Swiming Speed: </label>
            <input
              id="input-swiming-speed"
              type="number"
              className="monster-creator__input--swiming-speed"
              value={speed.swim}
              min={0}
              onChange={this.handleInputChange}
            />
            <label htmlFor="input-climning-speed">Climbing Speed: </label>
            <input
              id="input-climbing-speed"
              type="number"
              className="monster-creator__input--climbing-speed"
              value={speed.climb}
              min={0}
              onChange={this.handleInputChange}
            />
            <label htmlFor="input-climning-speed">Burrowing Speed: </label>
            <input
              id="input-burrowing-speed"
              type="number"
              className="monster-creator__input--burrowing-speed"
              value={speed.burrow}
              min={0}
              onChange={this.handleInputChange}
            />
            {shortAttributes.map(attr => (
              <div className="monster-creator__input-wrapper">
                <label htmlFor="input-str">{attr}: </label>
                <input
                  id={`input-${attr}`}
                  type="number"
                  className={`monster-creator__input--${attr}`}
                  value={attributes[attr]}
                  min={0}
                  max={30}
                  onChange={this.handleAttributeChange}
                />
              </div>
            ))}
            {shortAttributes.map(attr => (
              <div className="monster-creator__input-wrapper">
                <label htmlFor={`input-saving-${attr}`}>{attr}: </label>
                <input
                  id={`input-saving-${attr}`}
                  type="number"
                  className={`monster-creator__input--${attr}`}
                  value={savingThrows[attr]}
                  min={-30}
                  max={30}
                  onChange={this.handleSavingThrowsChange}
                />
              </div>
            ))}
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
                    className={`monster-creator__input--${processedName}`}
                    value={skills[name]}
                    min={-30}
                    max={30}
                    onChange={this.handleSkillsChange}
                  />
                </div>
              );
            })}
            <label htmlFor="vulnerabilities">Vulnerabilities: </label>
            <fieldset id="vulnerabilities">
              {damageTypes.map(type => (
                <div className="monster-creator__vulnerability-wrapper">
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
            <label htmlFor="damage-resistances">Damage Resistances: </label>
            <fieldset id="damage-resistances">
              {damageTypes.map(type => (
                <div className="monster-creator__resistance-wrapper">
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
            <label htmlFor="damage-immunities">Damage Immunities: </label>
            <fieldset id="damage-immunities">
              {damageTypes.map(type => (
                <div className="monster-creator__dmg-immunity-wrapper">
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
            <label htmlFor="conditions">Condition Immunities: </label>
            <fieldset id="conditions">
              {conditions.map(condition => (
                <div className="monster-creator__condition-wrapper">
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
            <label htmlFor="input-blindsight">Blindsight: </label>
            <input
              id="input-blindsight"
              type="number"
              className="monster-creator__input--blindsight"
              value={blindsight}
              min={0}
              onChange={this.handleInputChange}
            />
            <label htmlFor="input-darkvision">Darkvision: </label>
            <input
              id="input-darkvision"
              type="number"
              className="monster-creator__input--darkvision"
              value={darkvision}
              min={0}
              onChange={this.handleInputChange}
            />
            <label htmlFor="input-lowlight">Low-light vision: </label>
            <input
              id="input-lowlight"
              type="number"
              className="monster-creator__input--lowlight"
              value={lowLightVision}
              min={0}
              onChange={this.handleInputChange}
            />
            <label htmlFor="input-tremorsense">Tremorsense: </label>
            <input
              id="input-tremorsense"
              type="number"
              className="monster-creator__input--tremorsense"
              value={tremorsense}
              min={0}
              onChange={this.handleInputChange}
            />
            <label htmlFor="input-truesight">Truesight: </label>
            <input
              id="input-truesight"
              type="number"
              className="monster-creator__input--truesight"
              value={truesight}
              min={0}
              onChange={this.handleInputChange}
            />
            <label htmlFor="input-passive">Passive Perception: </label>
            <input
              id="input-passive"
              type="number"
              className="monster-creator__input--passive"
              value={passivePerception}
              min={0}
              onChange={this.handleInputChange}
            />
            <label htmlFor="input-languages">Languages: </label>
            <input
              id="input-languages"
              type="text"
              className="monster-creator__input--languages"
              value={languages}
              onChange={this.handleInputChange}
            />
            <label htmlFor="input-challenge">Challenge: </label>
            <select id="input-challenge" className="spell-creator__input--challenge" onChange={this.handleInputChange}>
              {Object.keys(challengeRating).map(challenge => (
                <option value={challenge}>{challenge}</option>
              ))}
            </select>
          </form>
        </div>
        <div className="monster-creator__preview-wrapper">
          <h3 className="monster-creator__name">{name || "Monster's name"}</h3>
          <p className="monster-creator__sub-info">{`${size} ${type}, ${alignment}`}</p>
          <p className="monster-creator__attribute">
            Armor Class:{' '}
            <span className="monster-creator__attribute-value monster-creator__classes">{`${ac} ${armor &&
              `(${armor})`}`}</span>
          </p>
          <p className="monster-creator__attribute">
            Hit Points:{' '}
            <span className="monster-creator__hp monster-creator__classes">{`${hp} ${hitDice && `(${hitDice})`}`}</span>
          </p>
          <p className="monster-creator__attribute">
            Speed:{' '}
            <span className="monster-creator__hp monster-creator__classes">
              {Object.keys(speed)
                .map(key => (speed[key] ? `${key} ${speed[key]} ft.` : null))
                .filter(el => el)
                .join(', ')}
            </span>
          </p>
          <p className="monster-creator__attribute">
            Str:{' '}
            <span className="monster-creator__str monster-creator__classes">
              {`${attributes.str} (${attributesSign.str}${Math.floor((attributes.str - 10) / 2)})`}
            </span>
          </p>
          <p className="monster-creator__attribute">
            Dex:{' '}
            <span className="monster-creator__dex monster-creator__classes">
              {`${attributes.dex} (${attributesSign.dex}${Math.floor((attributes.dex - 10) / 2)})`}
            </span>
          </p>
          <p className="monster-creator__attribute">
            Con:{' '}
            <span className="monster-creator__con monster-creator__classes">
              {`${attributes.con} (${attributesSign.con}${Math.floor((attributes.con - 10) / 2)})`}
            </span>
          </p>
          <p className="monster-creator__attribute">
            Int:{' '}
            <span className="monster-creator__int monster-creator__classes">
              {`${attributes.int} (${attributesSign.int}${Math.floor((attributes.int - 10) / 2)})`}
            </span>
          </p>
          <p className="monster-creator__attribute">
            Wis:{' '}
            <span className="monster-creator__wis monster-creator__classes">
              {`${attributes.wis} (${attributesSign.wis}${Math.floor((attributes.wis - 10) / 2)})`}
            </span>
          </p>
          <p className="monster-creator__attribute">
            Cha:{' '}
            <span className="monster-creator__cha monster-creator__classes">
              {`${attributes.cha} (${attributesSign.cha}${Math.floor((attributes.cha - 10) / 2)})`}
            </span>
          </p>
          <p className="monster-creator__attribute">
            Vulnerabilities:{' '}
            <span className="monster-creator__vulnerabilities spell-creator__classes">
              {vulnerabilities.join(', ')}
            </span>
          </p>
          <p className="monster-creator__attribute">
            Damage Resistances:{' '}
            <span className="monster-creator__damage-resistances spell-creator__classes">
              {damageResistances.join(', ')}
            </span>
          </p>
          <p className="monster-creator__attribute">
            Damage Immunities:{' '}
            <span className="monster-creator__damage-immunities spell-creator__classes">
              {damageImmunities.join(', ')}
            </span>
          </p>
          <p className="monster-creator__attribute">
            Condition Immunities:{' '}
            <span className="monster-creator__condition-immunities spell-creator__classes">
              {conditionImmunities.join(', ')}
            </span>
          </p>
          <p className="monster-creator__attribute">
            Senses:{' '}
            <span className="monster-creator__senses monster-creator__classes">
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
          <p className="monster-creator__attribute">
            Languages: <span className="monster-creator__condition-languages spell-creator__classes">{languages}</span>
          </p>
          <p className="monster-creator__attribute">
            Challenge:{' '}
            <span className="monster-creator__challenge spell-creator__classes">{`${challenge} (${
              challengeRating[challenge]
            } XP)`}</span>
          </p>
          {this.displaySavingThrows()}
          {this.displaySkills()}
        </div>
      </div>
    );
  }
}

export default MonsterCreatorPage;
