"use strict";

import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import GroceryList from '../components/GroceryList'
import * as ItemActions from '../actions/ItemActions'
import * as ListActions from '../actions/ListActions'

let App = ({ params, items, lists, listActions, itemActions }) => {
  return (
    <div>
      <GroceryList
        items={ items }
        lists={ lists }
        active_list_id={ params.listId }
        listActions={ listActions }
        itemActions={ itemActions }
      />
    </div>
)};

App.propTypes = {
  items: PropTypes.array.isRequired,
  lists: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  listActions: PropTypes.object.isRequired,
  itemActions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  items: state.list.items,
  lists: state.list.lists,
});

const mapDispatchToProps = dispatch => ({
  listActions: bindActionCreators(ListActions, dispatch),
  itemActions: bindActionCreators(ItemActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
