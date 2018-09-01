import React from 'react';
import JSPdf from 'jspdf';
import html2canvas from 'html2canvas';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { firebase } from '../../firebase/index';

import InformationalModal from '../../components/InformationalModal/InformationalModal';

import { officialClasses, dummyContent } from '../../copy/general';
import './_spellCreatorPage.scss';

class SpellCreatorPage extends React.Component {
  state = {
    name: "Spell's name",
    level: 0,
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
          levelString: this.stringifyLevel(value),
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

  stringifyLevel = level => {
    if (parseInt(level, 10) === 0) {
      return 'cantrip';
    }
    if (parseInt(level, 10) === 1) {
      return '1st level';
    }
    if (parseInt(level, 10) === 2) {
      return '2nd level';
    }
    if (parseInt(level, 10) === 3) {
      return '3rd level';
    }
    if (parseInt(level, 10) >= 4) {
      return `${level}th level`;
    }
    return null;
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
    const doc = new JSPdf();
    const result = document.querySelector('.spell-creator__preview-wrapper');
    let imgData;
    if (result) {
      html2canvas(result).then(canvas => {
        imgData = canvas.toDataURL('image/jpeg');
        doc.addImage(imgData, 'JPEG', 15, 40, 180, 180);
        doc.save('sample-file.pdf');
      });
    }
  };

  toggleModal = () => {
    this.setState(state => ({
      ...state,
      modalIsOpen: !state.modalIsOpen,
    }));
  };

  handleSave = event => {
    event.preventDefault();
    const { authUser } = this.props;
    if (authUser) {
      const { db } = firebase;
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
              })
              .then(() => {
                console.log('Document successfully written!');
                // maybe open a modal here that says succesfull and then redirect
                this.props.history.push('/');
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

  checkNameAvailability = name => {
    const { db } = firebase;
    const { authUser } = this.props;
    let availability;
    db.collection('spells')
      .doc(`${name}-${authUser.uid}`)
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log('already exists');
          availability = false;
          return availability;
        }
        console.log('available');
        availability = true;
        return availability;
      });
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
    } = this.state;

    return (
      <div className="spell-creator">
        <InformationalModal isOpen={modalIsOpen} toggleFunc={this.toggleModal} content={dummyContent} />
        <div className="spell-creator__form-wrapper">
          <form onSubmit={event => event.preventDefault()}>
            <label htmlFor="input-name">Spell&apos;s name: </label>
            <input
              id="input-name"
              type="text"
              className="spell-creator__input--name"
              value={name}
              onChange={this.handleInputChange}
            />
            <label htmlFor="input-level">Spell&apos;s level: </label>
            <input
              id="input-level"
              type="number"
              className="spell-creator__input--level"
              min="0"
              max="9"
              value={level}
              onChange={this.handleInputChange}
            />
            <label htmlFor="input-school">School: </label>
            <select id="input-school" className="spell-creator__input--school" onChange={this.handleInputChange}>
              <option value="abjuration">abjuration</option>
              <option value="conjuration">conjuration</option>
              <option value="divination">divination</option>
              <option value="enchantment">enchantment</option>
              <option value="evocation">evocation</option>
              <option value="illusion">illusion</option>
              <option value="necromancy">necromancy</option>
              <option value="transmutation">transmutation</option>
            </select>
            <label htmlFor="input-duration">Casting Time: </label>
            <input
              id="input-casting-time"
              type="text"
              className="spell-creator__input--casting-time"
              onChange={this.handleInputChange}
            />
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
                className="spell-creator__input--range"
                disabled={rangeInputDisabled}
                onChange={this.handleInputChange}
              />
            </fieldset>
            <label htmlFor="components">Components: </label>
            <fieldset id="components">
              <input type="checkbox" value="verbal" name="components" id="verbal" onClick={this.setStaticComponents} />
              <label htmlFor="verbal">verbal</label>
              <input
                type="checkbox"
                value="somatic"
                name="components"
                id="somatic"
                onClick={this.setStaticComponents}
              />
              <label htmlFor="somatic">somatic</label>
              <input
                type="checkbox"
                value="material"
                name="components"
                id="material"
                onClick={this.activateComponentsInput}
              />
              <label htmlFor="material">material</label>
              <input
                id="input-material"
                type="text"
                className="spell-creator__input--meterials"
                disabled={!material}
                onChange={this.handleInputChange}
              />
            </fieldset>
            <label htmlFor="input-duration">Duration: </label>
            <input
              id="input-duration"
              type="text"
              className="spell-creator__input--duration"
              onChange={this.handleInputChange}
            />
            <label htmlFor="classes">Classes: </label>
            <fieldset id="classes">
              {officialClasses.map(cls => (
                <div>
                  <input type="checkbox" value={cls} name="classes" id={`cls-${cls}`} onClick={this.setClasses} />
                  <label htmlFor={`cls-${cls}`}>{cls}</label>
                </div>
              ))}
            </fieldset>
            <label htmlFor="input-description">Description: </label>
            <textarea
              id="input-description"
              name="spell-description"
              cols="30"
              rows="10"
              onChange={this.handleInputChange}
            />
            <label htmlFor="input-higher-levels">At Higher Levels: </label>
            <textarea
              id="input-higher-level"
              name="higher-levels"
              cols="30"
              rows="10"
              onChange={this.handleInputChange}
            />
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
          <p className="spell-creator__description">{description}</p>
          <p className="spell-creator__attribute">
            At Higher Levels:{' '}
            <span className="spell-creator__attribute-value spell-creator__higher-levels">{higherLevel}</span>
          </p>
        </div>
      </div>
    );
  }
}

SpellCreatorPage.propTypes = {
  authUser: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  authUser: state.authUser,
});

export default withRouter(connect(mapStateToProps)(SpellCreatorPage));
