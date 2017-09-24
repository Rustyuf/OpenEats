"use strict";

import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import GroceryList from '../components/GroceryList'
import * as ListActions from '../actions/ListActions'

let List = ({ params, lists, listActions }) => {
  return (
    <GroceryList
      lists={ lists }
      activeListID={ params.listId }
      listActions={ listActions }
    />
)};

List.propTypes = {
  lists: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  listActions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  lists: state.list.lists,
});

const mapDispatchToProps = dispatch => ({
  listActions: bindActionCreators(ListActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
