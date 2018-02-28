import React, { Component } from 'react';
import { firebase } from '../../firebase/index';

import './_characterBuilder.scss';

class CharacterBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      characterName: '',
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
      characterName
    } = this.state;

    console.log(this.state.authUser);

    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Name" name="characterName" value={characterName} onInput={this.handleInput} />
        <button type="submit">Create</button>
      </form>
    );
  }
}

export default CharacterBuilder;