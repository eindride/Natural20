import React from 'react';
import JSPdf from 'jspdf';
import html2canvas from 'html2canvas';

import { officialClasses } from '../../copy/general';
import './_spellCreatorPage.scss';

class SpellCreatorPage extends React.Component {
	state = {
		name: 'Spell\'s name',
		level: 0,
		levelString: 'cantrip',
		school: 'abjuration',
		castingTime: '',
		range: 'Touch',
		rangeInputDisabled: true,
		verbal: false,
		somatic: false,
		material: false,
		duration: 'Instantenous',
		classes: [],
		description: '',
		higherLevel: '',
	};
	handleInputChange = event => {
		const value = event.target.value;
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
				}))
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
					range: value + " ft",
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
			return level + 'th level';
		}
	};

	setStaticRange = event => {
		const { target } = event;
		this.setState(state => ({
			...state,
			range: target.value,
			rangeInputDisabled: true,
		}));
	};

	activateRangeInput = () => {
		this.setState(state => ({
			...state,
			rangeInputDisabled: false,
		}));
	};

	setStaticComponents = event => {
		const { target } = event;
		this.setState(state => ({
			...state,
			[target.value]: !state[target.value],
		}));
	}

	activateComponentsInput = event => {
		this.setState(state => ({
			...state,
			material: !state.material,
		}));
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
			classes: classes,
		}));
	}

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
	}

	render() {
		const { name, level, levelString, school, range, rangeInputDisabled, verbal, somatic, material, materials, duration, classes, description, higherLevel, castingTime } = this.state;

		return (
			<div className="spell-creator">
				<div className="spell-creator__form-wrapper">
					<form onSubmit={() => console.log('form submited')}>
						<label for="input-name">Spell's name: </label>
						<input id="input-name" type="text" className="spell-creator__input--name" value={name} onChange={this.handleInputChange} />
						<label for="input-level">Spell's level: </label>
						<input id="input-level" type="number" className="spell-creator__input--level" min="0" max="9" value={level} onChange={this.handleInputChange} />
						<label for="input-school">School: </label>
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
						<label for="input-duration">Casting Time: </label>
						<input id="input-casting-time" type="text" className="spell-creator__input--casting-time" onChange={this.handleInputChange} />
						<label for="range">Range: </label>
						<fieldset id="range">
							<input type="radio" value="touch" name="range" id="range-touch" onClick={this.setStaticRange} />
							<label for="range-touch">touch</label>
							<input type="radio" value="unlimited" name="range" id="range-unlimited" onClick={this.setStaticRange} />
							<label for="range-unlimited">unlimited</label>
							<input type="radio" value="value" name="range" id="range-value" onClick={this.activateRangeInput} />
							<label for="range-value">value</label>
							<input id="input-range" type="number" className="spell-creator__input--range" disabled={rangeInputDisabled} onChange={this.handleInputChange} />
						</fieldset>
						<label for="components">Components: </label>
						<fieldset id="components">
							<input type="checkbox" value="verbal" name="components" id="verbal" onClick={this.setStaticComponents} />
							<label for="verbal">verbal</label>
							<input type="checkbox" value="somatic" name="components" id="somatic" onClick={this.setStaticComponents} />
							<label for="somatic">somatic</label>
							<input type="checkbox" value="material" name="components" id="material" onClick={this.activateComponentsInput} />
							<label for="material">material</label>
							<input id="input-material" type="text" className="spell-creator__input--meterials" disabled={!material} onChange={this.handleInputChange} />
						</fieldset>
						<label for="input-duration">Duration: </label>
						<input id="input-duration" type="text" className="spell-creator__input--duration" onChange={this.handleInputChange} />
						<label for="classes">Classes: </label>
						<fieldset id="classes">
							{
								officialClasses.map(cls => (
									<div>
										<input type="checkbox" value={cls} name="classes" id={"cls-" + cls} onClick={this.setClasses} />
										<label for={"cls-" + cls}>{cls}</label>
									</div>
								))
							}
						</fieldset>
						<label for="input-description">Description: </label>
						<textarea id="input-description" name="spell-description" cols="30" rows="10" onChange={this.handleInputChange}></textarea>
						<label for="input-higher-levels">At Higher Levels: </label>
						<textarea id="input-higher-level" name="higher-levels" cols="30" rows="10" onChange={this.handleInputChange}></textarea>
						<button>Save</button>
						<div onClick={this.savePDF}>Download PDF</div>
					</form>
				</div>

				<div className="spell-creator__preview-wrapper">
					<h3 className="spell-creator__name">{name || "Spell's name"}</h3>
					<p className="spell-creator__level">{levelString || "cantrip"} {school || 'abjuration'}</p>
					<p className="spell-creator__attribute">Casting Time: <span className="spell-creator__attribute-value spell-creator__casting-time">{castingTime}</span></p>
					<p className="spell-creator__attribute">Range: <span className="spell-creator__attribute-value spell-creator__range">{range}</span></p>
					<p className="spell-creator__attribute">Components: <span className="spell-creator__attribute-value spell-creator__components">{verbal && 'V '}{somatic && 'S '}{material && `M(${materials})`}</span></p>
					<p className="spell-creator__attribute">Duration: <span className="spell-creator__attribute-value spell-creator__duration">{duration}</span></p>
					<p className="spell-creator__attribute">Classes: <span className="spell-creator__attribute-value spell-creator__classes">{classes.join(', ')}</span></p>
					<p className="spell-creator__description">{description}</p>
					<p className="spell-creator__attribute">At Higher Levels: <span className="spell-creator__attribute-value spell-creator__higher-levels">{higherLevel}</span></p>
				</div>
			</div>
		)
	}
}

export default SpellCreatorPage;
