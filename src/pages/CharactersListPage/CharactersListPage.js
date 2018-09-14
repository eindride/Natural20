import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { firebase } from '../../firebase/index';
import Character from './Character';

import searchIcon from '../../assets/icons/search.svg';
import { alignments } from '../../copy/general';
import { raceInfo, classInfo } from '../../copy/characterOptions';

import './_charactersListPage.scss';

class MonstersListPage extends Component {
  state = {
    characters: [],
    searchText: '',
    searching: false,
    searchingFor: '',
    level: 'any',
    race: 'any',
    alignment: 'any',
    classFilter: 'any',
  };

  componentDidMount() {
    this.queryData();
  }

  queryData = () => {
    const { db } = firebase;
    let query = db.collection('characters');
    query = this.applyFiltersToQuery(query);
    query
      .orderBy('creationDate', 'desc')
      .get()
      .then(querySnapshot => {
        const results = querySnapshot.docs.map(doc => doc.data());
        const filteredResults = results;
        this.setState(state => ({
          ...state,
          characters: filteredResults,
        }));
      });
  };

  applyFiltersToQuery = query => {
    let filteredQuery = query;
    const { searchText, level, race, alignment, classFilter } = this.state;
    const { authUser } = this.props;
    if (authUser) {
      filteredQuery = filteredQuery.where('userId', '==', authUser.uid);
    }
    if (searchText.length) {
      filteredQuery = filteredQuery.where('name', '==', searchText);
    }
    if (level !== 'any') {
      filteredQuery = filteredQuery.where('level', '==', level);
    }
    if (race !== 'any') {
      filteredQuery = filteredQuery.where('race', '==', race);
    }
    if (alignment !== 'any') {
      filteredQuery = filteredQuery.where('alignment', '==', alignment);
    }
    if (classFilter !== 'any') {
      filteredQuery = filteredQuery.where('characterClass', '==', classFilter);
    }
    return filteredQuery;
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
      case 'input-race':
        attribute = 'race';
        break;
      case 'input-alignment':
        attribute = 'alignment';
        break;
      case 'input-class':
        attribute = 'classFilter';
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
    this.setState(state => ({
      ...state,
      searching: state.searchText.length !== 0,
      searchingFor: state.searchText,
    }));
    this.queryData();
  };

  handleClickCharacter = character => {
    console.log({ character });
    const { history } = this.props;
    history.push(`/character/${character.name}-${character.userId}`);
  };

  handleCancelSearch = () => {
    this.setState(
      state => ({
        ...state,
        searching: false,
        searchingFor: '',
        searchText: '',
      }),
      () => {
        this.queryData();
      }
    );
  };

  render() {
    const { characters, searchText, searching, searchingFor } = this.state;
    console.log({ characters });
    return (
      <div className="characters-list">
        <form className="characters-list__search-bar-container" onSubmit={this.handleSearchSubmit} autoComplete="off">
          <input
            id="input-search"
            className="characters-list__search-bar"
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={this.handleSearchInput}
          />
          <div onClick={this.handleSearchSubmit} onKeyDown={() => null} role="button" tabIndex={0}>
            <img src={searchIcon} alt="searchIcon" className="characters-list__search-icon" />
          </div>
        </form>
        <div className={`characters-list__search-text ${!searching && 'characters-list__hidden'}`}>
          <p>
            Searching for: <span className="characters-list__search-item">{searchingFor}</span>
            <div
              className="characters-list__close-button"
              onClick={this.handleCancelSearch}
              onKeyDown={() => null}
              role="button"
              tabIndex={0}
            >
              x
            </div>
          </p>
        </div>
        <div className="characters-list__filters-container">
          <span className="characters-list__filter-label">Level:</span>
          <select id="input-level" className="characters-list__filter" onChange={this.handleChangeInput}>
            <option value="any">any</option>
            {Array.from(Array(20).keys()).map((level, index) => {
              const key = `level-${index}`;
              return (
                <option value={level + 1} key={key}>
                  {level + 1}
                </option>
              );
            })}
          </select>
          <span className="characters-list__filter-label">Race:</span>
          <select id="input-race" className="characters-list__filter" onChange={this.handleChangeInput}>
            <option value="any">any</option>
            {Object.keys(raceInfo).map((race, index) => {
              const key = `race-${index}`;
              return (
                <option value={race} key={key}>
                  {race}
                </option>
              );
            })}
          </select>
          <span className="characters-list__filter-label">Alignment:</span>
          <select id="input-alignment" className="characters-list__filter" onChange={this.handleChangeInput}>
            <option value="any">any</option>
            {alignments.slice(2).map((alignment, index) => {
              const key = `alignment-${index}`;
              return (
                <option value={alignment} key={key}>
                  {alignment}
                </option>
              );
            })}
          </select>
          <span className="characters-list__filter-label">Class:</span>
          <select id="input-class" className="characters-list__filter" onChange={this.handleChangeInput}>
            <option value="any">any</option>
            {Object.keys(classInfo).map((cls, index) => {
              const key = `class-${index}`;
              return (
                <option value={cls} key={key}>
                  {cls}
                </option>
              );
            })}
          </select>
        </div>
        {characters.map((character, index) => {
          const key = `characters-${index}`;
          return <Character key={key} onClick={this.handleClickCharacter} character={character} />;
        })}
        {!characters.length ? <div className="no-results">No results</div> : null}
      </div>
    );
  }
}

MonstersListPage.propTypes = {
  authUser: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  authUser: state.authUser,
});

export default withRouter(connect(mapStateToProps)(MonstersListPage));
