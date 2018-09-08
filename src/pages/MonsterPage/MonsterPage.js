import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import JSPdf from 'jspdf';
import html2canvas from 'html2canvas';
import { connect } from 'react-redux';
import { firebase } from '../../firebase/index';
import { setMonster } from '../../redux/actions';
import { monthNames, challengeRating } from '../../copy/general';

class MonsterPage extends Component {
  state = {
    monster: {
      name: null,
      size: null,
      type: null,
      alignment: null,
      ac: null,
      armor: null,
      hp: null,
      hitDice: null,
      speed: {},
      attributes: {
        str: null,
        dex: null,
        con: null,
        int: null,
        wis: null,
        cha: null,
      },
      savingThrows: {
        str: null,
        dex: null,
        con: null,
        int: null,
        wis: null,
        cha: null,
      },
      skills: {
        acrobatics: 0,
        'animal handling': 0,
        arcana: 0,
        athletics: 0,
        deception: 0,
        history: 0,
        insight: 0,
        intimidation: 0,
        investigation: 0,
        medicine: 0,
        nature: 0,
        perception: 0,
        performance: 0,
        persuasion: 0,
        religion: 0,
        'sleight of Hand': 0,
        stealth: 0,
        survival: 0,
      },
      vulnerabilities: '',
      damageResistances: '',
      damageImmunities: '',
      conditionImmunities: '',
      blindsight: null,
      darkvision: null,
      lowLightVision: null,
      tremorsense: null,
      truesight: null,
      passivePerception: null,
      languages: null,
      challenge: null,
    },
    error: null,
    commentBody: '',
    comments: [],
    editBody: null,
  };

  componentDidMount() {
    const { monstername } = this.props.match.params;
    const { db } = firebase;
    db.collection('monsters')
      .doc(monstername)
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log('the doc exists');
          this.setState(state => ({
            ...state,
            monster: doc.data(),
          }));
          db.collection('posts')
            .where('postId', '==', monstername)
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
            error: 'The monster you are trying to access could not be retrieved',
          }));
        }
      })
      .catch(error => {
        console.log('An error ocured when retrieving the document', error);
        this.setState(state => ({
          ...state,
          error: 'The monster you are trying to access could not be retrieved',
        }));
      });
  }

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

  parseDate = date => {
    const year = date.getFullYear();
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${year}, ${day} ${month}, ${hour}:${minute}`;
  };

  handleEdit = () => {
    console.log('clicked on edit');
    // save monster to redux
    const { setMonsterToStore, history } = this.props;
    const { monster } = this.state;
    setMonsterToStore(monster);
    // navigate to monster generator
    history.push('/monster-creator');
  };

  handleDelete = () => {
    const { db } = firebase;
    const { monstername } = this.props.match.params;
    const { history } = this.props;
    db.collection('monsters')
      .doc(monstername)
      .delete()
      .then(() => {
        console.log('Document deleted');
        history.push('/creatures-list');
      })
      .catch(error => {
        console.log('An error occured while deleting', error);
        this.setState(state => ({
          ...state,
          deleteError: 'A problem occured while deleting the mopnster',
        }));
      });
  };

  savePDF = () => {
    const { name } = this.state.monster;
    const doc = new JSPdf();
    const result = document.querySelector('.monster-creator__preview-wrapper');
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

  displaySavingThrows = () => {
    const { savingThrows } = this.state.monster;
    const sum = Object.keys(savingThrows)
      .map(key => savingThrows[key])
      .reduce((acc, value) => acc + value);
    if (sum) {
      return (
        <p className="monster-creator__attribute">
          Saving Throws:{' '}
          <span className="monster-creator__attribute-value">
            {Object.keys(savingThrows)
              .map(
                key =>
                  savingThrows[key] !== 0 ? `${key} ${savingThrows[key] > 0 ? '+' : ''}${savingThrows[key]}` : null
              )
              .filter(el => el)
              .join(', ')}
          </span>
        </p>
      );
    }
    return null;
  };

  displaySkills = () => {
    const { skills } = this.state.monster;
    const sum = Object.keys(skills)
      .map(key => skills[key])
      .reduce((acc, value) => acc + value);
    if (sum) {
      return (
        <p className="monster-creator__attribute">
          Skills:{' '}
          <span className="monster-creator__attribute-value">
            {Object.keys(skills)
              .map(key => (skills[key] !== 0 ? `${key} ${skills[key] > 0 ? '+' : ''}${skills[key]}` : null))
              .filter(el => el)
              .join(', ')}
          </span>
        </p>
      );
    }
    return null;
  };

  handlePostComment = () => {
    const { commentBody } = this.state;
    const { authUser } = this.props;
    const { monstername } = this.props.match.params;
    const { db } = firebase;
    db.collection('posts')
      .doc(`${monstername}-${authUser.uid}-${this.generateRandomId()}`)
      .set({
        userId: authUser.uid,
        postId: monstername,
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
    const { monster, error, commentBody, comments, editComment, editBody } = this.state;
    console.log({ comments });
    const { authUser } = this.props;
    const {
      name,
      size,
      type,
      alignment,
      ac,
      armor,
      hp,
      hitDice,
      speed,
      attributes,
      vulnerabilities,
      damageResistances,
      damageImmunities,
      conditionImmunities,
      blindsight,
      darkvision,
      lowLightVision,
      tremorsense,
      truesight,
      passivePerception,
      languages,
      challenge,
    } = monster;

    const attributesSign = {
      str: attributes.str < 10 ? '' : '+',
      dex: attributes.dex < 10 ? '' : '+',
      con: attributes.con < 10 ? '' : '+',
      int: attributes.int < 10 ? '' : '+',
      wis: attributes.wis < 10 ? '' : '+',
      cha: attributes.cha < 10 ? '' : '+',
    };

    return (
      <div className="monster-page">
        {error && (
          <div>
            <h1>{error}</h1>
          </div>
        )}
        {monster && (
          <div className="monster-page__buttons-container">
            {authUser &&
              authUser.uid === monster.userId && (
                <button className="monster-page__button" onClick={this.handleEdit}>
                  Edit
                </button>
              )}
            {authUser &&
              authUser.uid === monster.userId && (
                <button className="monster-page__button" onClick={this.handleDelete}>
                  Delete
                </button>
              )}
            <button className="monster-page__button" onClick={this.savePDF}>
              Download PDF
            </button>
          </div>
        )}
        {monster ? (
          <div className="monster-page__preview-container">
            <div className="monster-creator__preview-wrapper monster-page__preview-wrapper">
              <h3 className="monster-creator__name">{name || "Monster's name"}</h3>
              <p className="monster-creator__sub-info">{`${size} ${type}${alignment && ','} ${alignment}`}</p>
              <div className="monster-creator__separator" />
              <p className="monster-creator__attribute">
                Armor Class:{' '}
                <span className="monster-creator__attribute-value">{`${ac} ${armor && `(${armor})`}`}</span>
              </p>
              <p className="monster-creator__attribute">
                Hit Points:{' '}
                <span className="monster-creator__attribute-value">{`${hp} ${hitDice && `(${hitDice})`}`}</span>
              </p>
              <p className="monster-creator__attribute">
                Speed:{' '}
                <span className="monster-creator__attribute-value">
                  {Object.keys(speed)
                    .map(key => (speed[key] ? `${key} ${speed[key]} ft.` : null))
                    .filter(el => el)
                    .join(', ')}
                </span>
              </p>
              <div className="monster-creator__separator" />
              <div className="monster-creator__ability-container">
                <div className="monster-creator__ability-wrapper">
                  <p className="monster-creator__attribute ">Str</p>
                  <span className="monster-creator__str monster-creator__classes">
                    {`${attributes.str} (${attributesSign.str}${Math.floor((attributes.str - 10) / 2)})`}
                  </span>
                </div>
                <div className="monster-creator__ability-wrapper">
                  <p className="monster-creator__attribute">Dex</p>
                  <span className="monster-creator__dex monster-creator__classes">
                    {`${attributes.dex} (${attributesSign.dex}${Math.floor((attributes.dex - 10) / 2)})`}
                  </span>
                </div>
                <div className="monster-creator__ability-wrapper">
                  <p className="monster-creator__attribute">Con:</p>
                  <span className="monster-creator__con monster-creator__classes">
                    {`${attributes.con} (${attributesSign.con}${Math.floor((attributes.con - 10) / 2)})`}
                  </span>
                </div>
                <div className="monster-creator__ability-wrapper">
                  <p className="monster-creator__attribute">Int</p>
                  <span className="monster-creator__int monster-creator__classes">
                    {`${attributes.int} (${attributesSign.int}${Math.floor((attributes.int - 10) / 2)})`}
                  </span>
                </div>
                <div className="monster-creator__ability-wrapper">
                  <p className="monster-creator__attribute">Wis</p>
                  <span className="monster-creator__wis monster-creator__classes">
                    {`${attributes.wis} (${attributesSign.wis}${Math.floor((attributes.wis - 10) / 2)})`}
                  </span>
                </div>
                <div className="monster-creator__ability-wrapper">
                  <p className="monster-creator__attribute">Cha</p>
                  <span className="monster-creator__cha monster-creator__classes">
                    {`${attributes.cha} (${attributesSign.cha}${Math.floor((attributes.cha - 10) / 2)})`}
                  </span>
                </div>
              </div>
              <div className="monster-creator__separator" />
              {this.displaySavingThrows()}
              {this.displaySkills()}
              {vulnerabilities.length ? (
                <p className="monster-creator__attribute">
                  Vulnerabilities:{' '}
                  <span className="monster-creator__attribute-value">{vulnerabilities.join(', ')}</span>
                </p>
              ) : null}
              {vulnerabilities.length ? (
                <p className="monster-creator__attribute">
                  Damage Resistances:{' '}
                  <span className="monster-creator__attribute-value">{damageResistances.join(', ')}</span>
                </p>
              ) : null}
              {damageImmunities.length ? (
                <p className="monster-creator__attribute">
                  Damage Immunities:{' '}
                  <span className="monster-creator__attribute-value">{damageImmunities.join(', ')}</span>
                </p>
              ) : null}
              {conditionImmunities.length ? (
                <p className="monster-creator__attribute">
                  Condition Immunities:{' '}
                  <span className="monster-creator__attribute-value">{conditionImmunities.join(', ')}</span>
                </p>
              ) : null}
              {parseInt(blindsight, 10) ||
                parseInt(darkvision, 10) ||
                parseInt(lowLightVision, 10) ||
                parseInt(lowLightVision, 10) ||
                parseInt(tremorsense, 10) ||
                parseInt(truesight, 10) ||
                parseInt(passivePerception, 10) ? (
                  <p className="monster-creator__attribute">
                    Senses:{' '}
                    <span className="monster-creator__attribute-value">
                      {[
                        {
                          name: 'blindsight',
                          value: parseInt(blindsight, 10),
                        },
                        {
                          name: 'darkvision',
                          value: parseInt(darkvision, 10),
                        },
                        {
                          name: 'low-light vision',
                          value: parseInt(lowLightVision, 10),
                        },
                        {
                          name: 'tremorsense',
                          value: parseInt(tremorsense, 10),
                        },
                        {
                          name: 'truesight',
                          value: parseInt(truesight, 10),
                        },
                        {
                          name: 'passivePerception',
                          value: parseInt(passivePerception, 10),
                        },
                      ]
                        .map(sense => (sense.value ? `${sense.name} ${sense.value} Ft.` : null))
                        .filter(el => el)
                        .join(', ')}
                    </span>
                  </p>
                ) : null}
              {languages ? (
                <p className="monster-creator__attribute">
                  Languages: <span className="monster-creator__attribute-value">{languages}</span>
                </p>
              ) : null}
              <p className="monster-creator__attribute">
                Challenge:{' '}
                <span className="monster-creator__attribute-value">{`${challenge} (${
                  challengeRating[challenge]
                  } XP)`}</span>
              </p>
              <div className="monster-creator__separator" />
            </div>
          </div>
        ) : (
            !error && <h1>Loading...</h1>
          )}
        {monster && (
          <div className="monster-page__comments-section">
            <div className="monster-page__input-container">
              <p className="monster-page__guidance-text">
                Have you tested this monster and have some thoughts on it? Leave a comment for others to see
              </p>
              <textarea
                className="monster-page__textbox"
                cols="30"
                rows="10"
                value={commentBody}
                onChange={this.handleTextboxChange}
              />
              <button className="monster-page__post-button" onClick={this.handlePostComment}>
                Comment
              </button>
            </div>

            <div className="monster-page__comments-container">
              {comments.map((comment, index) => (
                <div className="monster-page__comment">
                  <p className="monster-page__comment-author">
                    {comment.username} <span>- {this.parseDate(comment.creationDate)}</span>
                    <div className="monster-page__comment-buttons-container">
                      {comment.userId === authUser.uid && (
                        <button className="monster-page__button" onClick={this.handleClickEdit.bind(this, index)}>
                          Edit
                        </button>
                      )}
                      {comment.userId === authUser.uid && (
                        <button className="monster-page__button" onClick={this.handleDeleteComment.bind(this, index)}>
                          Delete
                        </button>
                      )}
                    </div>
                  </p>
                  {editComment === index ? (
                    <div className="monster-page__input-container">
                      <textarea
                        className="monster-page__textbox"
                        cols="30"
                        rows="10"
                        value={editBody}
                        onChange={this.handleEditTextboxChange}
                      />
                      <button className="monster-page__post-button" onClick={this.handleSaveEdit}>
                        Save
                      </button>
                    </div>
                  ) : (
                      <p className="monster-page__comment-body">{comment.message}</p>
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

MonsterPage.propTypes = {
  match: PropTypes.shape().isRequired,
  authUser: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  setMonsterToStore: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authUser: state.authUser,
});

const mapDispatchToProps = dispatch => ({
  setMonsterToStore: monster => dispatch(setMonster(monster)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MonsterPage)
);
