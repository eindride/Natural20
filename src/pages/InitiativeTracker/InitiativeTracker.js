import React, { Component } from 'react';

import InitiativeItem from '../../components/InitiativeItem/InitiativeItem';
import InitiativeModal from '../../components/InitiativeModal/InitiativeModal';

import './_initiativeTracker.scss';

class InitiativeTracker extends Component {
  state = {
    modalIsOpen: false,
    items: [],
    currentItem: 0,
  };

  toggleModal = () => {
    this.setState(state => ({
      ...state,
      modalIsOpen: !state.modalIsOpen,
    }));
  };

  handleAddNewItem = (name, initiative, hp) => {
    const { items } = this.state;
    items.push({
      name,
      initiative,
      hp,
    });
    items.sort((item1, item2) => {
      const initiative1 = parseInt(item1.initiative, 10);
      const initiative2 = parseInt(item2.initiative, 10);
      if (initiative1 > initiative2) {
        return -1;
      }
      if (initiative1 < initiative2) {
        return 1;
      }
      return 0;
    });
    this.setState(state => ({
      ...state,
      items,
    }));
  };

  handleDeleteItem = index => {
    const { items } = this.state;
    items.splice(index, 1);
    this.setState(state => ({
      ...state,
      items,
    }));
  };

  handleNextTurn = () => {
    const { items, currentItem } = this.state;
    const newItem = currentItem + 1 >= items.length ? 0 : currentItem + 1;
    this.setState(state => ({
      ...state,
      currentItem: newItem,
    }));
  };

  render() {
    const { items, modalIsOpen, currentItem } = this.state;
    return (
      <div className="tracker">
        <InitiativeModal isOpen={modalIsOpen} toggleFunc={this.toggleModal} submitFunc={this.handleAddNewItem} />
        <div className="tracker__container">
          {items.slice(currentItem, items.length).map((item, index) => {
            const key = `item-${index + currentItem}`;
            return (
              <InitiativeItem
                key={key}
                index={index + currentItem}
                name={item.name}
                initiative={item.initiative}
                hp={item.hp}
                deleteItemFunc={this.handleDeleteItem}
                currentItem={index === 0}
              />
            );
          })}
          {items.slice(0, currentItem).map((item, index) => {
            const key = `item-${index}`;
            return (
              <InitiativeItem
                key={key}
                index={index}
                name={item.name}
                initiative={item.initiative}
                hp={item.hp}
                deleteItemFunc={this.handleDeleteItem}
                currentItem={false}
              />
            );
          })}
        </div>
        <div className="tracker__menu-container">
          <button className="tracker__plus" onClick={this.toggleModal}>
            <span>+</span>
          </button>
          <button className="tracker__next" onClick={this.handleNextTurn}>
            Next turn
          </button>
        </div>
      </div>
    );
  }
}

export default InitiativeTracker;
