import React, { Component } from 'react';

import InformationalModal from '../../components/InformationalModal/InformationalModal';

import { officialClasses, officialRaces, alignments, shortAttributes } from '../../copy/general';
import { raceInfo, classInfo, weaponsInfo, armorsInfo } from '../../copy/characterOptions';

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

  render() {
    const { modalIsOpen, modalContent, name, level, attributes, race, characterClass, skills } = this.state;
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
            ) : null}

            <div className="character-creator__separator" />

            {classInfo[characterClass].armorChoices.length ? (
              <div className="character-creator__input-wrapper">
                <label htmlFor="armor">Choose one armor granted by your class: </label>
                <fieldset id="armor">
                  {classInfo[characterClass].armorChoices.map(armor => (
                    <div>
                      <input type="radio" value={armor} name="armor" id={`armor-${armor}`} onClick={this.chooseArmor} />
                      <label htmlFor={`armor-${armor}`}>{armor}</label>
                    </div>
                  ))}
                </fieldset>
              </div>
            ) : null}

            <div className="character-creator__separator" />

            {classInfo[characterClass].packChoices.length ? (
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
            ) : null}
          </form>
        </div>
        <div className="character-creator__preview-wrapper" />
      </div>
    );
  }
}

export default CharacterComponentPage;
