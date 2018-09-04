import React from 'react';
import JSPdf from 'jspdf';
import html2canvas from 'html2canvas';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { firebase } from '../../firebase/index';
import { setSpell } from '../../redux/actions';

import InformationalModal from '../../components/InformationalModal/InformationalModal';
import InfoButton from '../../components/InfoButton/InfoButton';

import { officialClasses, spellSchools } from '../../copy/general';
import spellInfoCopy from '../../copy/spellInfo';
import { stringifyLevel } from '../../utils';
import './_spellCreatorPage.scss';

class SpellCreatorPage extends React.Component {
  state = {
    name: "Spell's name",
    level: '0',
    levelString: 'cantrip',
    school: 'abjuration',
    castingTime: '',
    range: 'Touch',
    rangeInputDisabled: true,
    verbal: false,
    somatic: false,
    material: false,
    materials: '',
    duration: 'Instantenous',
    classes: [],
    description: '',
    higherLevel: '',
    modalIsOpen: false,
  };

  componentWillMount() {
    const { spell } = this.props;
    console.log({ spell });
    if (spell) {
      this.setState(state => ({
        ...state,
        castingTime: spell.castingTime,
        classes: spell.classes,
        material: spell.components.material,
        materials: spell.components.materials,
        somatic: spell.components.somatic,
        verbal: spell.components.verbal,
        description: spell.description,
        duration: spell.duration,
        higherLevel: spell.higherLevel,
        level: spell.level,
        name: spell.name,
        range: spell.range,
        school: spell.school,
      }));
    }
  }

  componentWillUnmount() {
    const { resetSpell } = this.props;
    resetSpell();
  }

  setClasses = event => {
    const { target } = event;
    const { classes } = this.state;
    const index = classes.findIndex(cls => cls === target.value);
    if (index >= 0) {
      classes.splice(index, 1);
    } else {
      classes.push(target.value);
      classes.sort();
    }
    this.setState(state => ({
      ...state,
      classes,
    }));
  };

  setStaticComponents = event => {
    const { target } = event;
    this.setState(state => ({
      ...state,
      [target.value]: !state[target.value],
    }));
  };

  setStaticRange = event => {
    const { target } = event;
    this.setState(state => ({
      ...state,
      range: target.value,
      rangeInputDisabled: true,
    }));
  };

  handleInputChange = event => {
    const { value } = event.target;
    let attribute = null;
    switch (event.target.id) {
      case 'input-name':
        attribute = 'name';
        break;
      case 'input-level':
        attribute = 'level';
        this.setState(state => ({
          ...state,
          levelString: stringifyLevel(value),
        }));
        break;
      case 'input-school':
        attribute = 'school';
        break;
      case 'input-material':
        attribute = 'materials';
        break;
      case 'input-range':
        this.setState(state => ({
          ...state,
          range: `${value} ft`,
        }));
        break;
      case 'input-duration':
        attribute = 'duration';
        break;
      case 'input-description':
        attribute = 'description';
        break;
      case 'input-higher-level':
        attribute = 'higherLevel';
        break;
      case 'input-casting-time':
        attribute = 'castingTime';
        break;
      default:
        return;
    }
    if (attribute) {
      this.setState(state => ({
        ...state,
        [attribute]: value,
      }));
    }
  };

  activateRangeInput = () => {
    this.setState(state => ({
      ...state,
      rangeInputDisabled: false,
    }));
  };

  activateComponentsInput = () => {
    this.setState(state => ({
      ...state,
      material: !state.material,
    }));
  };

  savePDF = () => {
    const { name } = this.state;
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

  toggleModal = content => {
    this.setState(state => ({
      ...state,
      modalIsOpen: !state.modalIsOpen,
      modalContent: content,
    }));
  };

  handleSave = event => {
    event.preventDefault();
    const { spell } = this.props;
    const { db } = firebase;
    if (spell) {
      // if spell is not null that means this is an edit. so first delete the old doc
      db.collection('spells')
        .doc(`${spell.name}-${spell.userId}`)
        .delete()
        .then(() => {
          console.log('Old spell was deleted succesfully!');
          this.saveSpell();
        })
        .catch(error => {
          console.log('An error occured whule deleting the old doc', error);
        });
    } else {
      this.saveSpell();
    }
  };

  saveSpell = () => {
    const { db } = firebase;
    const { authUser } = this.props;
    if (authUser) {
      const {
        name,
        level,
        school,
        castingTime,
        range,
        verbal,
        somatic,
        material,
        materials,
        duration,
        classes,
        description,
        higherLevel,
      } = this.state;
      db.collection('spells')
        .doc(`${name}-${authUser.uid}`)
        .get()
        .then(doc => {
          if (doc.exists) {
            console.log('already exists');
          } else {
            console.log('available');

            db.collection('spells')
              .doc(`${name}-${authUser.uid}`)
              .set({
                userId: authUser.uid,
                name,
                level,
                school,
                castingTime,
                range,
                components: {
                  verbal,
                  somatic,
                  material,
                  materials,
                },
                duration,
                classes,
                description,
                higherLevel,
                creationDate: new Date(),
              })
              .then(() => {
                console.log('Document successfully written!');
                // maybe open a modal here that says succesfull and then redirect
                this.props.history.push('/spells-list');
              })
              .catch(error => {
                console.error('Error writing document: ', error);
                this.setState(state => ({
                  ...state,
                  error,
                }));
              });
          }
        });
    } else {
      this.setState(state => ({
        ...state,
        error: 'You must be logged in to save your spell!',
      }));
    }
  };

  render() {
    const {
      name,
      level,
      levelString,
      school,
      range,
      rangeInputDisabled,
      verbal,
      somatic,
      material,
      materials,
      duration,
      classes,
      description,
      higherLevel,
      castingTime,
      modalIsOpen,
      modalContent,
    } = this.state;

    return (
      <div className="spell-creator">
        <InformationalModal isOpen={modalIsOpen} toggleFunc={this.toggleModal} content={modalContent} />
        <div className="spell-creator__form-wrapper">
          <form onSubmit={event => event.preventDefault()}>
            <div className="spell-creator__input-wrapper">
              <label htmlFor="input-name">Spell&apos;s name: </label>
              <input
                id="input-name"
                type="text"
                className="spell-creator__input-text"
                value={name}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="spell-creator__separator" />

            <div className="spell-creator__input-wrapper">
              <label htmlFor="input-level">Spell&apos;s level: </label>
              <input
                id="input-level"
                type="number"
                className="spell-creator__input-number"
                min="0"
                max="9"
                value={level}
                onChange={this.handleInputChange}
              />
              <InfoButton onClick={this.toggleModal} content={spellInfoCopy.level} />
            </div>

            <div className="spell-creator__separator" />

            <div className="spell-creator__input-wrapper">
              <label htmlFor="input-school">School: </label>
              <select id="input-school" className="spell-creator__input-select" onChange={this.handleInputChange}>
                {spellSchools.map(school => (
                  <option value={school} selected={school === this.state.school}>
                    {school}
                  </option>
                ))}
              </select>
              <InfoButton onClick={this.toggleModal} content={spellInfoCopy.schools} />
            </div>

            <div className="spell-creator__separator" />

            <div className="spell-creator__input-wrapper">
              <label htmlFor="input-duration">Casting Time: </label>
              <input
                id="input-casting-time"
                type="text"
                value={castingTime}
                className="spell-creator__input-text"
                onChange={this.handleInputChange}
              />
              <InfoButton onClick={this.toggleModal} content={spellInfoCopy.castingTime} />
            </div>

            <div className="spell-creator__separator" />

            <div className="spell-creator__input-wrapper">
              <label htmlFor="range">Range: </label>
              <fieldset id="range">
                <input type="radio" value="touch" name="range" id="range-touch" onClick={this.setStaticRange} />
                <label htmlFor="range-touch">touch</label>
                <input type="radio" value="unlimited" name="range" id="range-unlimited" onClick={this.setStaticRange} />
                <label htmlFor="range-unlimited">unlimited</label>
                <input type="radio" value="value" name="range" id="range-value" onClick={this.activateRangeInput} />
                <label htmlFor="range-value">value</label>
                <input
                  id="input-range"
                  type="number"
                  className="spell-creator__input-number"
                  disabled={rangeInputDisabled}
                  onChange={this.handleInputChange}
                />
              </fieldset>
              <InfoButton onClick={this.toggleModal} content={spellInfoCopy.range} />
            </div>

            <div className="spell-creator__separator" />

            <div className="spell-creator__input-wrapper">
              <label htmlFor="components">Components: </label>
              <fieldset id="components" className="spell-creator__components-fieldset">
                <input
                  type="checkbox"
                  value="verbal"
                  name="components"
                  id="verbal"
                  onClick={this.setStaticComponents}
                  checked={verbal}
                />
                <label htmlFor="verbal">verbal</label>
                <input
                  type="checkbox"
                  value="somatic"
                  name="components"
                  id="somatic"
                  onClick={this.setStaticComponents}
                  checked={somatic}
                />
                <label htmlFor="somatic">somatic</label>
                <input
                  type="checkbox"
                  value="material"
                  name="components"
                  id="material"
                  onClick={this.activateComponentsInput}
                  checked={material}
                />
                <label htmlFor="material">material</label>
                <input
                  id="input-material"
                  type="text"
                  value={materials}
                  className="spell-creator__input-text"
                  disabled={!material}
                  onChange={this.handleInputChange}
                />
              </fieldset>
              <InfoButton onClick={this.toggleModal} content={spellInfoCopy.components} />
            </div>

            <div className="spell-creator__separator" />

            <div className="spell-creator__input-wrapper">
              <label htmlFor="input-duration">Duration: </label>
              <input
                id="input-duration"
                type="text"
                value={duration}
                className="spell-creator__input-text"
                onChange={this.handleInputChange}
              />
              <InfoButton onClick={this.toggleModal} content={spellInfoCopy.duration} />
            </div>

            <div className="spell-creator__separator" />

            <div className="spell-creator__input-wrapper">
              <label htmlFor="classes">Classes: </label>
              <fieldset id="classes">
                {officialClasses.map(cls => (
                  <div className="spell-creator__class-wrapper">
                    <input
                      type="checkbox"
                      value={cls}
                      name="classes"
                      id={`cls-${cls}`}
                      onClick={this.setClasses}
                      checked={classes.includes(cls)}
                    />
                    <label htmlFor={`cls-${cls}`}>{cls}</label>
                  </div>
                ))}
              </fieldset>
            </div>

            <div className="spell-creator__separator" />

            <div className="spell-creator__textbox-wrapper">
              <label htmlFor="input-description">Description: </label>
              <textarea
                id="input-description"
                className="spell-creator__textbox"
                name="spell-description"
                cols="30"
                rows="10"
                value={description}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="spell-creator__separator" />

            <div className="spell-creator__textbox-wrapper">
              <label htmlFor="input-higher-levels">At Higher Levels: </label>
              <textarea
                id="input-higher-level"
                className="spell-creator__textbox"
                name="higher-levels"
                cols="30"
                rows="10"
                value={higherLevel}
                onChange={this.handleInputChange}
              />
            </div>
            <button onClick={this.handleSave}>Save</button>
            <button onClick={this.savePDF}>Download PDF</button>
          </form>
          <button onClick={this.toggleModal}>open modal</button>
        </div>

        <div className="spell-creator__preview-wrapper">
          <h3 className="spell-creator__name">{name || "Spell's name"}</h3>
          <p className="spell-creator__level">
            {levelString || 'cantrip'} {school || 'abjuration'}
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
              {verbal && 'V '}
              {somatic && 'S '}
              {material && `M(${materials})`}
            </span>
          </p>
          <p className="spell-creator__attribute">
            Duration: <span className="spell-creator__attribute-value spell-creator__duration">{duration}</span>
          </p>
          <p className="spell-creator__attribute">
            Classes: <span className="spell-creator__attribute-value spell-creator__classes">{classes.join(', ')}</span>
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
      </div>
    );
  }
}

SpellCreatorPage.propTypes = {
  authUser: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  spell: PropTypes.shape().isRequired,
  resetSpell: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authUser: state.authUser,
  spell: state.spell,
});

const mapDispatchToProps = dispatch => ({
  resetSpell: () => dispatch(setSpell(null)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SpellCreatorPage)
);
