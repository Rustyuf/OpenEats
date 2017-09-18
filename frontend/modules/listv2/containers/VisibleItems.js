import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import ItemActions from '../actions/ItemActions'
import List from '../components/List'

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

const mapDispatchToProps = ({
  toggleItem: ItemActions.toggle,
  deleteItem: ItemActions.delete
});

const VisibleList = connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

export default VisibleList
