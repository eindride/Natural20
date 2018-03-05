import React, { Component } from 'react';
import { firebase } from '../../firebase/index';

import raceInfo from '../../copy/raceInfo.json';

import './_characterBuilder.scss';

class CharacterBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      characterName: '',
      race: 'Human',
      characterClass: 'Barbarian',
      background: 'Acolyte',
      alignment: 'Lawful good',
      level: "1",
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  }

  createLevelOptions() {
    const lvlArray = [];
    for (let i = 1; i <= 20; i++) {
      lvlArray.push(<option key={i} value={i}>{i}</option>);
    }
    return lvlArray;
  }

  handleSubmit(e) {
    e.preventDefault();

    const {
      characterName,
    } = this.state;

    const {
      authUser
    } = this.props;

    firebase.db.collection("characters").add({
      characterName: characterName,
      author: authUser.email,
    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  render() {
    const {
      characterName,
      race,
      characterClass,
      alignment,
      level,
    } = this.state;

    console.log(this.state);
    console.log(raceInfo);

    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Name" name="characterName" value={characterName} onInput={this.handleInput} />

        <select name="race" onChange={this.handleInput}>
          <option value="Human">Human</option>
          <option value="Elf">Elf</option>
          <option value="Dwarf">Dwarf</option>
          <option value="Half-elf">Half-elf</option>
          <option value="Half-orc">Half-orc</option>
          <option value="Halfling">Halfling</option>
          <option value="Gnome">Gnome</option>
        </select>

        <select name="characterClass" onChange={this.handleInput}>
          <option value="Barbarian">Barbarian</option>
          <option value="Bard">Bard</option>
          <option value="Cleric">Cleric</option>
          <option value="Druid">Druid</option>
          <option value="Monk">Monk</option>
          <option value="Paladin">Paladin</option>
          <option value="Ranger">Ranger</option>
          <option value="Sorcerer">Sorcerer</option>
          <option value="Warlock">Warlock</option>
        </select>

        <select name="level" onChange={this.handleInput}>
          {
            this.createLevelOptions()
          }
        </select>

        <select name="background" onChange={this.handleInput}>
          <option value="Acolyte">Acolyte</option>
          <option value="Charlatan">Charlatan</option>
          <option value="Criminal">Criminal</option>
          <option value="Entertainer">Entertainer</option>
          <option value="Folk Hero">Folk Hero</option>
          <option value="Gladiator">Gladiator</option>
          <option value="Guild Artisan">Guild Artisan</option>
          <option value="Guild Merchant">Guild Merchant</option>
          <option value="Hermit">Hermit</option>
          <option value="Knight">Knight</option>
          <option value="Noble">Noble</option>
          <option value="Outlander">Outlander</option>
          <option value="Sage">Sage</option>
          <option value="Sailor">Sailor</option>
          <option value="Soldier">Soldier</option>
          <option value="Spy">Spy</option>
          <option value="Urchin">Urchin</option>
        </select>

        <select name="alignment" onChange={this.handleInput}>
          <option value="Lawful good">Lawful good</option>
          <option value="Neutral good">Neutral good</option>
          <option value="Chaotic good">Chaotic good</option>
          <option value="Lawful neutral">Lawful neutral</option>
          <option value="True neutral">True neutral</option>
          <option value="Chaotic neutral">Chaotic neutral</option>
          <option value="Lawful evil">Lawful evil</option>
          <option value="Neutral evil">Neutral evil</option>
          <option value="Chaotic evil">Chaotic evil</option>
        </select>

        <button type="submit">Create</button>
      </form>
    );
  }
}

export default CharacterBuilder;