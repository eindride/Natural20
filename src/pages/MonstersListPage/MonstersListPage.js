import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { firebase } from '../../firebase/index';
import Monster from './Monster';

import searchIcon from '../../assets/icons/search.svg';
import { creatureSizes, creatureTypes, alignments, challengeRating } from '../../copy/general';

import './_monstersListPage.scss';

class MonstersListPage extends Component {
  state = {
    monsters: [],
    userMonsters: false,
    size: 'any',
    type: 'any',
    alignment: 'any',
    challenge: 'any',
    searchText: '',
    searching: false,
    searchingFor: '',
  };

  componentDidMount() {
    this.queryData();
  }

  queryData = () => {
    const { db } = firebase;
    let query = db.collection('monsters');
    query = this.applyFiltersToQuery(query);
    query
      .orderBy('creationDate', 'desc')
      .get()
      .then(querySnapshot => {
        const results = querySnapshot.docs.map(doc => doc.data());
        const filteredResults = results;
        this.setState(state => ({
          ...state,
          monsters: filteredResults,
        }));
      });
  };

  applyFiltersToQuery = query => {
    let filteredQuery = query;
    const { userMonsters, size, type, alignment, challenge, searchText } = this.state;
    const { authUser } = this.props;
    if (userMonsters && authUser) {
      filteredQuery = filteredQuery.where('userId', '==', authUser.uid);
    }
    if (size !== 'any') {
      filteredQuery = filteredQuery.where('size', '==', size);
    }
    if (type !== 'any') {
      filteredQuery = filteredQuery.where('type', '==', type);
    }
    if (alignment !== 'any') {
      filteredQuery = filteredQuery.where('alignment', '==', alignment);
    }
    if (challenge !== 'any') {
      filteredQuery = filteredQuery.where('challenge', '==', challenge);
    }
    if (searchText.length) {
      filteredQuery = filteredQuery.where('name', '==', searchText);
    }
    return filteredQuery;
  };

  filterUserMonsters = () => {
    this.setState(
      state => ({
        ...state,
        userMonsters: !state.userMonsters,
      }),
      () => {
        this.queryData();
      }
    );
  };

  handleChangeInput = event => {
    const { value } = event.target;
    console.log({ value });
    let attribute = null;
    switch (event.target.id) {
      case 'input-search':
        attribute = 'searchText';
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
      case 'input-challenge':
        attribute = 'challenge';
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

  handleClickMonster = monster => {
    console.log({ monster });
    const { history } = this.props;
    history.push(`/monster/${monster.name}-${monster.userId}`);
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
    const { monsters, searchText, searching, searchingFor, userMonsters } = this.state;
    console.log({ monsters });
    return (
      <div className="monsters-list">
        <form className="monsters-list__search-bar-container" onSubmit={this.handleSearchSubmit} autoComplete="off">
          <input
            id="input-search"
            className="monsters-list__search-bar"
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={this.handleSearchInput}
          />
          <div onClick={this.handleSearchSubmit} onKeyDown={() => null} role="button" tabIndex={0}>
            <img src={searchIcon} alt="searchIcon" className="monsters-list__search-icon" />
          </div>
        </form>
        <div className={`monsters-list__search-text ${!searching && 'monsters-list__hidden'}`}>
          <p>
            Searching for: <span className="monsters-list__search-item">{searchingFor}</span>
            <div
              className="monsters-list__close-button"
              onClick={this.handleCancelSearch}
              onKeyDown={() => null}
              role="button"
              tabIndex={0}
            >
              x
            </div>
          </p>
        </div>
        <div className="monsters-list__filters-container">
          <button
            className={`monsters-list__filter-button ${userMonsters && 'monsters-list__button-active'}`}
            onClick={this.filterUserMonsters}
          >
            {userMonsters ? 'Show all monsters' : 'Show only my monsters'}
          </button>
          <span className="monsters-list__filter-label">Size:</span>
          <select id="input-size" className="monsters-list__filter" onChange={this.handleChangeInput}>
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
          <span className="monsters-list__filter-label">Type:</span>
          <select id="input-type" className="monsters-list__filter" onChange={this.handleChangeInput}>
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
          <span className="monsters-list__filter-label">Alignment:</span>
          <select id="input-alignment" className="monsters-list__filter" onChange={this.handleChangeInput}>
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
          <span className="monsters-list__filter-label">Challenge:</span>
          <select id="input-challenge" className="monsters-list__filter" onChange={this.handleChangeInput}>
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
        {monsters.map((monster, index) => {
          const key = `monsters-${index}`;
          return <Monster key={key} onClick={this.handleClickMonster} monster={monster} />;
        })}
        {!monsters.length ? <div className="no-results">No results</div> : null}
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
