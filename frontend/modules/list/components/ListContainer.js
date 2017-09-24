"use strict";

import React from 'react'
import { injectIntl, defineMessages } from 'react-intl'

import ListFooter from './ListFooter'
import ListItem from './ListItem'
import AddItem from './AddItem'

import {
  ALL_ITEMS,
  ACTIVE_ITEMS,
  COMPLETED_ITEMS,
  ENTER_KEY
} from '../constants/ListStatus'

class ListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nowShowing: ALL_ITEMS,
      editing: null,
    };
  }

  componentDidMount() {
    if (this.props.activeListID !== null) {
      this.props.itemActions.load(this.props.activeListID);
    }
  }

  edit = (item) =>  {
    this.setState({editing: item.id});
  };

  save = (itemToSave, text) => {
    this.props.itemActions.save(itemToSave, text);
    this.setState({editing: null});
  };

  cancel = () =>  {
    this.setState({editing: null});
  };

  filterStatus = (status) =>  {
    this.setState({nowShowing: status});
  };

  toggle = (itemToToggle) =>  {
    this.props.itemActions.toggle(itemToToggle);
  };

  toggleAll = (event) => {
    this.props.itemActions.toggleAll(
      this.getToogleItems(event.target.checked)
    );
  };

  destroy = (item) => {
    this.props.itemActions.destroy(item);
  };

  getCheckedItems = () => {
    return this.props.items.reduce(function (list, item) {
      if (item.completed === true) {
        list.push(item.id);
      }
      return list;
    }, []);
  };

  getToogleItems = (checked) =>  {
    return this.props.items.reduce(function (list, item) {
      if (item.completed !== checked) {
        list.push({
          id: item.id,
          completed: checked
        });
      }
      return list;
    }, []);
  };

  clearCompleted = () => {
    this.props.itemActions.clearCompleted(
      this.getCheckedItems()
    );
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
          onToggle={ this.toggle.bind(this, item) }
          onDestroy={ this.destroy.bind(this, item) }
          onEdit={ this.edit.bind(this, item) }
          editing={ this.state.editing === item.id }
          onSave={ this.save.bind(this, item) }
          onCancel={ this.cancel}
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
          onClearCompleted={ this.clearCompleted }
          onFilterStatus={ this.filterStatus }
        />;
    }

    if (items.length) {
      main = (
        <section className="main">
          <input
            className="toggle-all"
            type="checkbox"
            onChange={ this.toggleAll }
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

export default injectIntl(ListContainer)
