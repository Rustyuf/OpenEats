import ListConstants from '../constants/ListConstants'
import ItemConstants from '../constants/ItemConstants'
import { default as items } from './ItemReducer'

const lists = (state = [], action) => {
  switch (action.type) {
    case ListConstants.LIST_INIT:
      return action.lists.map(list => {
        return { ...list, items: [] }
      });
    case ListConstants.LIST_ADD:
      return [
        ...state,
        { ...action, items: [] }
      ];
    case ListConstants.LIST_SAVE:
      return state.map(list =>
        list.id === action.id ?
          { ...list, title: action.title } :
          list
      );
    case ListConstants.LIST_DELETE:
      return state.filter(t => t.id !== action.id);
    case (action.type.indexOf(ItemConstants.ITEM_INDEX) !== -1 ? action.type : '') :
      return state.map(list =>
        list.id == action.list ?
          { ...list, items: items(list.items, action) } :
          list
      );
    default:
      return state
  }
};

export default lists
