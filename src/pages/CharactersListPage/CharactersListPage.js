import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { firebase } from '../../firebase/index';
import Character from './Character';

import searchIcon from '../../assets/icons/search.svg';
import { creatureSizes, creatureTypes, alignments, challengeRating } from '../../copy/general';

import './_charactersListPage.scss';

class MonstersListPage extends Component {
  state = {
    characters: [],
    searchText: '',
    searching: false,
    searchingFor: '',
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
    const { searchText } = this.state;
    const { authUser } = this.props;
    if (authUser) {
      filteredQuery = filteredQuery.where('userId', '==', authUser.uid);
    }
    if (searchText.length) {
      filteredQuery = filteredQuery.where('name', '==', searchText);
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
          <button
            className={`characters-list__filter-button ${userMonsters && 'characters-list__button-active'}`}
            onClick={this.filterUserSpells}
          >
            {userMonsters ? 'Show all monsters' : 'Show only my monsters'}
          </button>
          <span className="characters-list__filter-label">Size:</span>
          <select id="input-size" className="characters-list__filter" onChange={this.handleChangeInput}>
            <option value="any">any</option>
            {creatureSizes.map((size, index) => {
              const key = `size-${index}`;
              return (
                <option value={size} key={key}>
                  {size}
                </option>
              );
            })}
          </select>
          <span className="characters-list__filter-label">Type:</span>
          <select id="input-type" className="characters-list__filter" onChange={this.handleChangeInput}>
            <option value="any">any</option>
            {creatureTypes.map((type, index) => {
              const key = `type-${index}`;
              return (
                <option value={type} key={key}>
                  {type}
                </option>
              );
            })}
          </select>
          <span className="characters-list__filter-label">Alignment:</span>
          <select id="input-alignment" className="characters-list__filter" onChange={this.handleChangeInput}>
            <option value="any">any</option>
            {alignments.map((alignment, index) => {
              const key = `alignment-${index}`;
              return (
                <option value={alignment} key={key}>
                  {alignment}
                </option>
              );
            })}
          </select>
          <span className="characters-list__filter-label">Challenge:</span>
          <select id="input-challenge" className="characters-list__filter" onChange={this.handleChangeInput}>
            <option value="any">any</option>
            {Object.keys(challengeRating).map((challenge, index) => {
              const key = `challenge-${index}`;
              return (
                <option value={challenge} key={key}>
                  {challenge}
                </option>
              );
            })}
          </select>
        </div>
        {characters.map((monster, index) => {
          const key = `characters-${index}`;
          return <Monster key={key} onClick={this.handleClickMonster} monster={monster} />;
        })}
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
