import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebase } from '../../firebase/index';
import { setSpell } from '../../redux/actions';

class SpellPage extends Component {
  state = {
    spell: null,
    error: null,
  };

  componentDidMount() {
    const { spellname } = this.props.match.params;
    const { db } = firebase;
    db.collection('spells')
      .doc(spellname)
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log('the doc exists');
          this.setState(state => ({
            ...state,
            spell: doc.data(),
          }));
        } else {
          console.log('No such document exists!');
          this.setState(state => ({
            ...state,
            error: 'The spell you are trying to access could not be retrieved',
          }));
        }
      })
      .catch(error => {
        console.log('An error ocured when retrieving the document', error);
        this.setState(state => ({
          ...state,
          error: 'The spell you are trying to access could not be retrieved',
        }));
      });
  }

  handleEdit = () => {
    console.log('clicked on edit');
    // save spell to redux
    const { setSpellToStore, history } = this.props;
    const { spell } = this.state;
    setSpellToStore(spell);
    // navigate to spell generator
    history.push('/spell-creator');
  };

  handleDelete = () => {
    const { db } = firebase;
    const { spellname } = this.props.match.params;
    const { history } = this.props;
    db.collection('spells')
      .doc(spellname)
      .delete()
      .then(() => {
        console.log('Document deleted');
        history.push('/spells-list');
      })
      .catch(error => {
        console.log('An error occured while deleting', error);
        this.setState(state => ({
          ...state,
          deleteError: 'A problem occured while deleting the spell',
        }));
      });
  };

  render() {
    const { spell, error } = this.state;
    const { authUser } = this.props;
    return (
      <div className="spell-page">
        {error && (
          <div>
            <h1>{error}</h1>
          </div>
        )}
        {spell ? (
          <div>
            <h1>{spell.name}</h1>
            {authUser.uid === spell.userId && <button onClick={this.handleEdit}>Edit</button>}
            {authUser.uid === spell.userId && <button onClick={this.handleDelete}>Delete</button>}
          </div>
        ) : (
          !error && <h1>Loading...</h1>
        )}
      </div>
    );
  }
}

SpellPage.propTypes = {
  match: PropTypes.shape().isRequired,
  authUser: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  setSpellToStore: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authUser: state.authUser,
});

const mapDispatchToProps = dispatch => ({
  setSpellToStore: spell => dispatch(setSpell(spell)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SpellPage)
);
