import { connect } from 'react-redux'
import * as ItemActions from '../actions/ItemActions'
import List from '../components/List'
import { bindActionCreators } from 'redux'

const getVisibleItems = (items, filter, id) => {
  switch (filter) {
    case 'SHOW_ALL':
      return items;
    case 'SHOW_COMPLETED':
      return items.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return items.filter(t => !t.completed);
    default:
      throw new Error('Unknown filter: ' + filter)
  }
};

const mapStateToProps = (state, ownProps) => ({
  items: getVisibleItems(state.list.items, state.list.visibilityFilter, ownProps.list)
});

const mapDispatchToProps = dispatch => ({
  toggleItem: ItemActions.toggle,
  deleteItem: ItemActions.destroy,
  actions123: bindActionCreators(ItemActions, dispatch)
});

const VisibleList = connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

export default VisibleList
