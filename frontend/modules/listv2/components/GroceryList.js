import React from 'react'
import { injectIntl, defineMessages } from 'react-intl'

import ListContainer from './ListContainer'
import MyLists from './MyLists'
import ListHeader from './ListHeader'
import NewList from './NewList'

require("./../css/grocery_list.scss");

export default injectIntl(React.createClass({

  // getInitialState: function() {
  //   return {
  //     lists: this.props.lists || null,
  //     active_list_id: this.props.active || null,
  //     active_list_name: '' || null,
  //   };
  // },

  componentDidMount: function() {
    this.props.listActions.init();
  },

  // componentWillReceiveProps(nextProps) {
  //   this.props.listActions.init(nextProps.params.active);
  // },

  // _onChange: function() {
  //   this.setState({
  //     lists: ListStore.get_lists() || null,
  //     active_list_id: ListStore.get_id() || null,
  //     active_list_name: ListStore.get_name() || null,
  //   });
  // },

  addList: function(title) {
    this.props.listActions.add(title);
  },

  updateList: function(title) {
    this.props.listActions.save(this.props.active_list_id, title);
  },

  removeList: function() {
    this.props.listActions.destroy(this.props.active_list_id);
  },

  render: function() {
    const { formatMessage } = this.props.intl;
    const messages = defineMessages({
      my_lists: {
        id: 'grocery_list.my_lists',
        description: 'My Lists',
        defaultMessage: 'My Lists',
      },
      footer: {
        id: 'grocery_list.footer',
        description: 'Double Click to edit an item.',
        defaultMessage: 'Double Click to edit an item.',
      },
    });

    let render_list = '';
    if (this.props.active_list_id != null) {
      render_list = (
        <div className="col-md-9">
          <div className="grocery-list">
            <ListHeader
              title={ this.props.active_list_name }
              updateList = { this.updateList }
              removeList = { this.removeList }
            />
            <ListContainer
              items={ this.props.items }
              list_id={ this.props.active_list_id }
              itemActions={ this.props.itemActions }
            />
          </div>
          <div className="list-info-footer">{ formatMessage(messages.footer) }</div>
        </div>
      );
    } else {
      render_list = (
        <div className="col-md-9">
          <NewList addList={ this.addList }/>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="row">
          { render_list }
          <div className="col-md-3">
            <MyLists title={ formatMessage(messages.my_lists) } lists={ this.props.lists }/>
          </div>
        </div>
      </div>
    );
  }
}));
