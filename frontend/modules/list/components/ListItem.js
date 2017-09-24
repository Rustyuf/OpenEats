"use strict";

import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { injectIntl, defineMessages } from 'react-intl'

import {
  ENTER_KEY,
  ESCAPE_KEY
} from '../constants/ListStatus'

class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.item.title
    };
  }

  handleSubmit = (event) => {
    let val = this.state.title.trim();
    if (val) {
      this.props.onSave(val);
      this.setState({title: val});
    } else {
      this.props.onDestroy();
    }
  };

  handleEdit = () => {
    this.props.onEdit();
    this.setState({title: this.props.item.title});
  };

  handleKeyDown = (event) => {
    if (event.which === ESCAPE_KEY) {
      this.setState({title: this.props.item.title});
      this.props.onCancel(event);
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit(event);
    }
  };

  handleChange = (event) => {
    if (this.props.editing) {
      this.setState({title: event.target.value});
    }
  };

  render() {
    return (
      <li className={classNames({
        completed: this.props.item.completed,
        editing: this.props.editing
      })}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.item.completed}
            onChange={this.props.onToggle}
          />
          <label onDoubleClick={this.handleEdit}>
            {this.props.item.title}
          </label>
          <button className="destroy" onClick={this.props.onDestroy} />
        </div>
        <input
          ref="editField"
          className="edit"
          value={this.state.title}
          onBlur={this.handleSubmit}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </li>
    );
  }
}

ListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ListItem)
