import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import JSPdf from 'jspdf';
import html2canvas from 'html2canvas';
import { connect } from 'react-redux';
import { firebase } from '../../firebase/index';
import { setSpell } from '../../redux/actions';
import { dummyComments } from '../../copy/general';
import { stringifyLevel } from '../../utils';

class SpellPage extends Component {
  state = {
    spell: {
      name: null,
      level: null,
      school: null,
      components: {
        verbal: null,
        somatic: null,
        material: null,
        materials: null,
      },
      description: null,
      higherLevel: null,
      castingTime: null,
      range: null,
      duration: null,
      classes: [],
      userId: null,
    },
    error: null,
    commentBody: '',
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

  savePDF = () => {
    const { name } = this.state.spell;
    const doc = new JSPdf();
    const result = document.querySelector('.spell-creator__preview-wrapper');
    let imgData;
    if (result) {
      html2canvas(result).then(canvas => {
        imgData = canvas.toDataURL('image/jpeg');
        doc.addImage(imgData, 'JPEG', 15, 40, 180, 180);
        doc.save(`${name}.pdf`);
      });
    }
  };

  handleTextboxChange = event => {
    const { value } = event.target;
    this.setState(state => ({
      ...state,
      commentBody: value,
    }));
  };

  render() {
    const { spell, error, commentBody } = this.state;
    const { authUser } = this.props;
    const { name, level, school, components, description, higherLevel, castingTime, range, duration, classes } = spell;
    return (
      <div className="spell-page">
        {error && (
          <div>
            <h1>{error}</h1>
          </div>
        )}
        {spell && (
          <div className="spell-page__buttons-container">
            {authUser &&
              authUser.uid === spell.userId && (
                <button className="spell-page__button" onClick={this.handleEdit}>
                  Edit
                </button>
              )}
            {authUser &&
              authUser.uid === spell.userId && (
                <button className="spell-page__button" onClick={this.handleDelete}>
                  Delete
                </button>
              )}
            <button className="spell-page__button" onClick={this.savePDF}>
              Download PDF
            </button>
          </div>
        )}
        {spell ? (
          <div className="spell-creator__preview-wrapper spell-page__preview-wrapper">
            <h3 className="spell-creator__name">{name || "Spell's name"}</h3>
            <p className="spell-creator__level">
              {stringifyLevel(level) || 'cantrip'} {school || 'abjuration'}
            </p>
            <div className="spell-creator__separator" />
            <p className="spell-creator__attribute">
              Casting Time:{' '}
              <span className="spell-creator__attribute-value spell-creator__casting-time">{castingTime}</span>
            </p>
            <p className="spell-creator__attribute">
              Range: <span className="spell-creator__attribute-value spell-creator__range">{range}</span>
            </p>
            <p className="spell-creator__attribute">
              Components:{' '}
              <span className="spell-creator__attribute-value spell-creator__components">
                {components.verbal && 'V '}
                {components.somatic && 'S '}
                {components.material && `M(${components.materials})`}
              </span>
            </p>
            <p className="spell-creator__attribute">
              Duration: <span className="spell-creator__attribute-value spell-creator__duration">{duration}</span>
            </p>
            <p className="spell-creator__attribute">
              Classes:{' '}
              <span className="spell-creator__attribute-value spell-creator__classes">{classes.join(', ')}</span>
            </p>
            <div className="spell-creator__separator" />
            <p className="spell-creator__description">{description}</p>
            {higherLevel && (
              <p className="spell-creator__attribute">
                At Higher Levels:{' '}
                <span className="spell-creator__attribute-value spell-creator__higher-levels">{higherLevel}</span>
              </p>
            )}
          </div>
        ) : (
          !error && <h1>Loading...</h1>
        )}
        {spell && (
          <div className="spell-page__comments-section">
            <div className="spell-page__input-container">
              <p className="spell-page__guidance-text">
                Have you tested this spell and have some thoughts on it? Leave a comment for others to see
              </p>
              <textarea
                className="spell-page__textbox"
                cols="30"
                rows="10"
                value={commentBody}
                onChange={this.handleTextboxChange}
              />
              <button className="spell-page__post-button">Comment</button>
            </div>

            <div className="spell-page__comments-container">
              {dummyComments.map(comment => (
                <div className="spell-page__comment">
                  <p className="spell-page__comment-author">
                    {comment.author} <span>- {comment.date}</span>
                  </p>
                  <p className="spell-page__comment-body">{comment.message}</p>
                </div>
              ))}
            </div>
          </div>
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
