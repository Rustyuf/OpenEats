"use strict";

import React from 'react'
import { injectIntl, defineMessages } from 'react-intl'

import ListFooter from './ListFooter'
import ListItem from './ListItem'
import AddItem from './AddItem'

import {
  ALL_ITEMS,
  ACTIVE_ITEMS,
  COMPLETED_ITEMS
} from '../constants/ListStatus'

class ListItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nowShowing: ALL_ITEMS,
      editing: null,
    };
  }

  toggleEdit = (id) =>  {
    this.setState({editing: id});
  };

  filterStatus = (status) =>  {
    this.setState({nowShowing: status});
  };

  render() {
    let footer;
    let main;
    let items = this.props.items;

    let shownItems = items.filter(function (item) {
      switch (this.state.nowShowing) {
      case ACTIVE_ITEMS:
        return !item.completed;
      case COMPLETED_ITEMS:
        return item.completed;
      default:
        return true;
      }
    }, this);

    let listItems = shownItems.map(function (item) {
      return (
        <ListItem
          key={ item.id }
          item={ item }
          editing={ this.state.editing === item.id }
          onToggle={ this.props.itemActions.toggle }
          onDestroy={ this.props.itemActions.destroy }
          onToggleEdit={ this.toggleEdit }
          onSave={ this.props.itemActions.save.bind(this, item) }
        />
      );
    }, this);

    let activeListCount = items.reduce(function (accum, item) {
      return item.completed ? accum : accum + 1;
    }, 0);

    let completedCount = items.length - activeListCount;

    if (activeListCount || completedCount) {
      footer =
        <ListFooter
          itemCount={ activeListCount }
          completedCount={ completedCount }
          activeFilter={ this.state.nowShowing }
          onClearCompleted={ this.props.itemActions.clearCompleted.bind(this, items) }
          onFilterStatus={ this.filterStatus }
        />;
    }

    if (items.length) {
      main = (
        <section className="main">
          <input
            className="toggle-all"
            type="checkbox"
            onChange={ this.props.itemActions.toggleAll.bind(this, items) }
            checked={ activeListCount === 0 }
          />
          <ul className="item-list">
            { listItems }
          </ul>
        </section>
      );
    }

    return (
      <div>
        <header className="header">
          <AddItem
            activeListID={ this.props.activeListID }
            addItem={ this.props.itemActions.add }
          />
        </header>
        { main }
        { footer }
      </div>
    );
  }
}

export default injectIntl(ListItems)
