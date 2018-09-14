import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { firebase } from '../../firebase/index';
import Spell from './Spell';
import { spellSchools, officialClasses } from '../../copy/general';

import searchIcon from '../../assets/icons/search.svg';

import './_spellsListPage.scss';

class SpellsListPage extends Component {
  state = {
    spells: [],
    userSpells: false,
    level: 'any',
    school: 'any',
    cls: 'any',
    searchText: '',
    searching: false,
    searchingFor: '',
  };

  componentDidMount() {
    this.queryData();
  }

  componentWillUpdate() {}

  getCommentsNr = spellId =>
    new Promise(resolve => {
      const { db } = firebase;
      db.collection('posts')
        .where('postId', '==', spellId)
        .get()
        .then(querySnapshot => {
          resolve(querySnapshot.docs.length);
        })
        .catch(error => {
          console.log({ error });
        });
    });

  queryData = () => {
    const { db } = firebase;
    let query = db.collection('spells');
    const { cls } = this.state;
    query = this.applyFiltersToQuery(query);
    query
      .orderBy('creationDate', 'desc')
      .get()
      .then(querySnapshot => {
        const results = querySnapshot.docs.map(doc => ({ ...doc.data(), spellId: doc.id, commentsNr: 0 }));
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
        this.setState(
          state => ({
            ...state,
            spells: filteredResults,
          }),
          () => {
            const { spells } = this.state;
            const promises = spells.map(spell => this.getCommentsNr(spell.spellId));
            Promise.all(promises)
              .then(commentsNrs => {
                console.log({ commentsNrs });
                const finalSpells = spells.map((spell, index) => ({
                  ...spell,
                  commentsNr: commentsNrs[index],
                }));
                this.setState(state => ({
                  ...state,
                  spells: finalSpells,
                }));
              })
              .catch(error => {
                console.error('There was a problem while quering for comments nr', error);
              });
          }
        );
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
    this.setState(
      state => ({
        ...state,
        userSpells: !state.userSpells,
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
    this.setState(state => ({
      ...state,
      searching: state.searchText.length !== 0,
      searchingFor: state.searchText,
    }));
    this.queryData();
  };

  handleClickSpell = spell => {
    console.log({ spell });
    const { history } = this.props;
    history.push(`/spell/${spell.name}-${spell.userId}`);
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
    const { spells, searchText, searching, searchingFor, userSpells } = this.state;
    return (
      <div className="spells-list">
        <form className="spells-list__search-bar-container" onSubmit={this.handleSearchSubmit} autoComplete="off">
          <input
            id="input-search"
            className="spells-list__search-bar"
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={this.handleSearchInput}
          />
          <div onClick={this.handleSearchSubmit} onKeyDown={() => null} role="button" tabIndex={0}>
            <img src={searchIcon} alt="searchIcon" className="spells-list__search-icon" />
          </div>
        </form>
        <div className={`spells-list__search-text ${!searching && 'spells-list__hidden'}`}>
          <p>
            Searching for: <span className="spells-list__search-item">{searchingFor}</span>
            <div
              className="spells-list__close-button"
              onClick={this.handleCancelSearch}
              onKeyDown={() => null}
              role="button"
              tabIndex={0}
            >
              x
            </div>
          </p>
        </div>
        <div className="spells-list__filters-container">
          <button
            className={`spells-list__filter-button ${userSpells && 'spells-list__button-active'}`}
            onClick={this.filterUserSpells}
          >
            {userSpells ? 'Show all spells' : 'Show only my spells'}
          </button>
          <span className="spells-list__filter-label">Level:</span>
          <select id="input-level" className="spells-list__filter" onChange={this.handleChangeInput}>
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
          <span className="spells-list__filter-label">School:</span>
          <select id="input-school" className="spells-list__filter" onChange={this.handleChangeInput}>
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
          <span className="spells-list__filter-label">Class:</span>
          <select id="input-classes" className="spells-list__filter" onChange={this.handleChangeInput}>
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
        </div>
        {spells.map((spell, index) => {
          const key = `spell-${index}`;
          return <Spell key={key} onClick={this.handleClickSpell} spell={spell} commentsNr={spell.commentsNr} />;
        })}
        {!spells.length ? <div className="no-results">No results</div> : null}
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
