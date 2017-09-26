"use strict";

import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ListContainer from '../components/ListContainer'
import * as ItemActions from '../actions/ItemActions'

class Items extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.activeListID) {
      this.props.itemActions.load(this.props.activeListID);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeListID != this.props.activeListID) {
      this.props.itemActions.load(nextProps.activeListID);
    }
  }

  render() {
    let { activeListID, items, itemActions } = this.props;
    return (
      <ListContainer
        activeListID={ activeListID }
        items={ items }
        itemActions={ itemActions }
      />
    )
  }
}

Items.propTypes = {
  activeListID: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  itemActions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  items: state.list.items,
});

const mapDispatchToProps = dispatch => ({
  itemActions: bindActionCreators(ItemActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Items);
