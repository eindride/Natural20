import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { firebase } from '../../firebase/index';
import Spell from './Spell';
import { spellSchools, officialClasses } from '../../copy/general';

import './_spellsListPage.scss';

class SpellsListPage extends Component {
  state = {
    spells: [],
    userSpells: false,
    level: 'any',
    school: 'any',
    cls: 'any',
    searchText: '',
  };

  componentDidMount() {
    this.queryData();
  }

  componentWillUpdate() {}

  queryData = () => {
    const { db } = firebase;
    let query = db.collection('spells');
    const { cls } = this.state;
    query = this.applyFiltersToQuery(query);
    query
      .orderBy('creationDate', 'desc')
      .get()
      .then(querySnapshot => {
        const results = querySnapshot.docs.map(doc => doc.data());
        const filteredResults = results
          .map(result => {
            if (cls !== 'any') {
              if (result.classes.includes(cls)) {
                return result;
              }
              return null;
            }
            return result;
          })
          .filter(el => el);
        this.setState(state => ({
          ...state,
          spells: filteredResults,
        }));
      });
  };

  applyFiltersToQuery = query => {
    let filteredQuery = query;
    const { userSpells, level, school, searchText } = this.state;
    const { authUser } = this.props;
    if (userSpells && authUser) {
      filteredQuery = filteredQuery.where('userId', '==', authUser.uid);
    }
    if (level !== 'any') {
      console.log({ level });
      filteredQuery = filteredQuery.where('level', '==', level);
    }
    if (school !== 'any') {
      console.log({ school });
      filteredQuery = filteredQuery.where('school', '==', school);
    }
    if (searchText.length) {
      console.log({ searchText });
      filteredQuery = filteredQuery.where('name', '==', searchText);
    }
    return filteredQuery;
  };

  filterUserSpells = () => {
    this.setState(state => ({
      ...state,
      userSpells: true,
    }));
    this.queryData();
  };

  handleChangeInput = event => {
    const { value } = event.target;
    console.log({ value });
    let attribute = null;
    switch (event.target.id) {
      case 'input-search':
        attribute = 'searchText';
        break;
      case 'input-level':
        attribute = 'level';
        break;
      case 'input-school':
        attribute = 'school';
        break;
      case 'input-classes':
        attribute = 'cls';
        break;
      default:
        return;
    }
    if (attribute) {
      this.setState(
        state => ({
          ...state,
          [attribute]: value,
        }),
        () => this.queryData()
      );
    }
  };

  handleSearchInput = event => {
    const { value } = event.target;
    this.setState(state => ({
      ...state,
      searchText: value,
    }));
  };

  handleSearchSubmit = event => {
    event.preventDefault();
    this.queryData();
  };

  handleClickSpell = spell => {
    console.log({ spell });
    const { history } = this.props;
    history.push(`/spell/${spell.name}-${spell.userId}`);
  };

  render() {
    const { spells } = this.state;
    return (
      <div className="spells-list">
        <form onSubmit={this.handleSearchSubmit}>
          <input id="input-search" type="text" onChange={this.handleSearchInput} />
        </form>
        <button onClick={this.filterUserSpells}>Show only my spells</button>
        <select id="input-level" onChange={this.handleChangeInput}>
          <option value="any">any</option>
          {Array.from(Array(10).keys()).map((nr, index) => {
            const key = `lvl-${index}`;
            return (
              <option value={nr} key={key}>
                {nr}
              </option>
            );
          })}
        </select>
        <select id="input-school" onChange={this.handleChangeInput}>
          <option value="any">any</option>
          {spellSchools.map((school, index) => {
            const key = `school-${index}`;
            return (
              <option value={school} key={key}>
                {school}
              </option>
            );
          })}
        </select>
        <select id="input-classes" onChange={this.handleChangeInput}>
          <option value="any">any</option>
          {officialClasses.map((cls, index) => {
            const key = `class-${index}`;
            return (
              <option value={cls} key={key}>
                {cls}
              </option>
            );
          })}
        </select>
        {spells.map((spell, index) => {
          const key = `spell-${index}`;
          return <Spell key={key} onClick={this.handleClickSpell} spell={spell} />;
        })}
      </div>
    );
  }
}

SpellsListPage.propTypes = {
  authUser: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  authUser: state.authUser,
});

export default withRouter(connect(mapStateToProps)(SpellsListPage));
