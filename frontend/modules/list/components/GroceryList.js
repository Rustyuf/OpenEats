"use strict";

import React from 'react'
import { injectIntl, defineMessages } from 'react-intl'

import Items from '../Containers/Items'
import MyLists from './MyLists'
import ListHeader from './ListHeader'
import NewList from './NewList'

require("./../css/grocery_list.scss");

class GroceryList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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

    let { activeListID, lists, listActions } = this.props;

    let renderList = '';
    if (activeListID && lists.length > 0) {
      renderList = (
        <div className="col-md-9">
          <div className="grocery-list">
            <ListHeader
              list={ lists.find(t => t.id == activeListID) }
              updateList = { listActions.save }
              removeList = { listActions.destroy }
            />
            <Items activeListID={ activeListID } />
          </div>
          <div className="list-info-footer">{ formatMessage(messages.footer) }</div>
        </div>
      );
    } else {
      renderList = (
        <div className="col-md-9">
          <NewList addList={ listActions.add }/>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="row">
          { renderList }
          <div className="col-md-3">
            <MyLists title={ formatMessage(messages.my_lists) } lists={ lists }/>
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(GroceryList)
