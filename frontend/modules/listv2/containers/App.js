"use strict";

import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import GroceryList from '../components/GroceryList'
import * as ItemActions from '../actions/ItemActions'
import * as ListActions from '../actions/ListActions'

let App = ({ dispatch, params, items, lists, listActions, itemActions }) => {
  if (!(items.length > 0)) {
    console.log('items')
    dispatch(ItemActions.load(params.listId));
  }
  if (!(lists.length > 0)) {
    console.log('list')
    dispatch(ListActions.init());
  }

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

// App.propTypes = {
//   items: PropTypes.array.isRequired,
//   lists: PropTypes.array.isRequired,
//   listActions: PropTypes.object.isRequired,
//   itemActions: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
  items: state.list.items,
  lists: state.list.lists,
});

const mapDispatchToProps = dispatch => ({
  listActions: bindActionCreators(ListActions, dispatch),
  itemActions: bindActionCreators(ItemActions, dispatch),
  dispatch
});

// App = connect()(App);
//
// export default App
//
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
