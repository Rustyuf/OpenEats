"use strict";

import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import GroceryList from '../components/GroceryList'
import * as ListActions from '../actions/ListActions'

class List extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.listActions.load();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lists.length > 0 && nextProps.params.listId) {
      if (!(nextProps.lists.find(t => t.id == nextProps.params.listId))) {
        browserHistory.push('/list/');
      }
    }
  }

  render() {
    let { params, lists, listActions } = this.props;
    return (
      <GroceryList
        lists={ lists }
        activeListID={ params.listId }
        listActions={ listActions }
      />
    )
  }
}

List.propTypes = {
  lists: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  listActions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  lists: state.list.lists,
  error: state.list.error,
});

const mapDispatchToProps = dispatch => ({
  listActions: bindActionCreators(ListActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
