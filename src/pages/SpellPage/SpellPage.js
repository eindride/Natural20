import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import JSPdf from 'jspdf';
import html2canvas from 'html2canvas';
import { connect } from 'react-redux';
import { firebase } from '../../firebase/index';
import { setSpell } from '../../redux/actions';
import { monthNames } from '../../copy/general';
import { stringifyLevel } from '../../utils';

import image1 from '../../assets/images/1.jpg';
import image2 from '../../assets/images/2.jpg';
import image3 from '../../assets/images/3.jpg';
import image4 from '../../assets/images/4.jpg';
import image5 from '../../assets/images/5.jpg';
import image6 from '../../assets/images/6.jpg';
import image7 from '../../assets/images/7.jpg';
import image8 from '../../assets/images/dm-tools-background.jpg';
import image9 from '../../assets/images/spell-creator-background.jpg';

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
    comments: [],
    editComment: null,
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
            image: this.getRandomImage(),
          }));
          db.collection('posts')
            .where('postId', '==', spellname)
            .orderBy('creationDate', 'desc')
            .get()
            .then(querySnapshot => {
              const results = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                commentId: doc.id,
              }));
              const promises = results.map(result => this.getUsername(result.userId));
              Promise.all(promises)
                .then(usernames => {
                  const finalResults = results.map((result, index) => ({
                    ...result,
                    username: usernames[index],
                  }));
                  this.setState(state => ({
                    ...state,
                    comments: finalResults,
                  }));
                })
                .catch(error => {
                  console.error('There was a problem while queriing usernames', error);
                });
            })
            .catch(error => {
              console.log('An error occured while quering the comments', error);
            });
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

  getRandomImage = () => {
    const imagesArray = [image1, image2, image3, image4, image5, image6, image7, image8, image9];
    return imagesArray[Math.floor(Math.random() * Math.floor(imagesArray.length))];
  };

  getUsername = userId =>
    new Promise(resolve => {
      const { db } = firebase;
      db.collection('users')
        .where('userId', '==', userId)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            resolve(doc.data().username);
          });
        })
        .catch(error => {
          console.log({ error });
        });
    });

  handleEdit = () => {
    console.log('clicked on edit');
    // save spell to redux
    const { setSpellToStore, history } = this.props;
    const { spellname } = this.props.match.params;
    const { spell } = this.state;
    setSpellToStore({
      ...spell,
      spellId: spellname,
    });
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

  handleEditTextboxChange = event => {
    const { value } = event.target;
    this.setState(state => ({
      ...state,
      editBody: value,
    }));
  };

  handlePostComment = () => {
    const { commentBody } = this.state;
    const { authUser } = this.props;
    const { spellname } = this.props.match.params;
    const { db } = firebase;
    db.collection('posts')
      .doc(`${spellname}-${authUser.uid}-${this.generateRandomId()}`)
      .set({
        userId: authUser.uid,
        postId: spellname,
        message: commentBody,
        creationDate: new Date(),
      })
      .then(() => {
        window.location.reload();
      })
      .catch(error => {
        console.log('There was a problem posting the comment', error);
        this.setState(state => ({
          ...state,
          postError: error,
        }));
      });
  };

  generateRandomId = () =>
    Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(2, 10);

  parseDate = date => {
    const year = date.getFullYear();
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${year}, ${day} ${month}, ${hour}:${minute}`;
  };

  handleClickEdit = index => {
    this.setState(state => ({
      ...state,
      editComment: index,
      editBody: state.comments[index].message,
    }));
  };

  handleSaveEdit = () => {
    const { comments, editComment } = this.state;
    const { editBody } = this.state;
    const { db } = firebase;
    db.collection('posts')
      .doc(comments[editComment].commentId)
      .update({
        message: editBody,
      })
      .then(() => {
        window.location.reload();
      })
      .catch(error => {
        console.log('There was a problem posting the comment', error);
        this.setState(state => ({
          ...state,
          postError: error,
        }));
      });
  };

  handleDeleteComment = index => {
    const { db } = firebase;
    const { commentId } = this.state.comments[index];
    db.collection('posts')
      .doc(commentId)
      .delete()
      .then(() => {
        console.log('Document deleted');
        window.location.reload();
      })
      .catch(error => {
        console.log('An error occured while deleting', error);
        this.setState(state => ({
          ...state,
          deleteError: 'A problem occured while deleting the comment',
        }));
      });
  };

  render() {
    console.log(this.getRandomImage());
    const { spell, error, commentBody, image, comments, editComment, editBody } = this.state;
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
          <div className="spell-page__preview-container">
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
            <div className="spell-page__image-container" style={{ backgroundImage: `url(${image})` }} />
          </div>
        ) : (
          !error && <h1>Loading...</h1>
        )}
        {spell && (
          <div className="spell-page__comments-section">
            {authUser && (
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
                <button className="spell-page__post-button" onClick={this.handlePostComment}>
                  Comment
                </button>
              </div>
            )}

            <div className="spell-page__comments-container">
              {comments.map((comment, index) => (
                <div className="spell-page__comment">
                  <p className="spell-page__comment-author">
                    {comment.username} <span>- {this.parseDate(comment.creationDate)}</span>
                    <div className="spell-page__comment-buttons-container">
                      {authUser &&
                        comment.userId === authUser.uid && (
                          <button className="spell-page__button" onClick={this.handleClickEdit.bind(this, index)}>
                            Edit
                          </button>
                        )}
                      {authUser &&
                        comment.userId === authUser.uid && (
                          <button className="spell-page__button" onClick={this.handleDeleteComment.bind(this, index)}>
                            Delete
                          </button>
                        )}
                    </div>
                  </p>
                  {editComment === index ? (
                    <div className="spell-page__input-container">
                      <textarea
                        className="spell-page__textbox"
                        cols="30"
                        rows="10"
                        value={editBody}
                        onChange={this.handleEditTextboxChange}
                      />
                      <button className="spell-page__post-button" onClick={this.handleSaveEdit}>
                        Save
                      </button>
                    </div>
                  ) : (
                    <p className="spell-page__comment-body">{comment.message}</p>
                  )}
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
