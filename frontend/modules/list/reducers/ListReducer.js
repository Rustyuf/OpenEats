import ListConstants from '../constants/ListConstants'

const lists = (state = [], action) => {
  switch (action.type) {
    case ListConstants.LIST_INIT:
      return action.lists.map(groceryList => {
        return { ...groceryList }
      });
    case ListConstants.LIST_ADD:
      return [
        ...state,
        { ...action }
      ];
    case ListConstants.LIST_SAVE:
      return state.map(list =>
        list.id === action.id ?
          { ...list, title: action.title } :
          list
      );
    case ListConstants.LIST_DELETE:
      return state.filter(t => t.id !== action.id);
    default:
      return state
  }
};

export default lists
