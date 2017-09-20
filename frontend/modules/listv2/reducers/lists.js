import ListConstants from '../constants/ListConstants'

const list = (state, action) => {
  switch (action.type) {
    case ListConstants.LIST_INIT:
      return {
        ...action
      };
    case ListConstants.LIST_ADD:
      return {
        ...action
      };
    case ListConstants.LIST_SAVE:
      if (state.id !== action.id) {
        return state
      }

      return {
        id: state.id,
        title: action.title,
        item_count: state.item_count,
      };
    default:
      return state
  }
};

const lists = (state = [], action) => {
  switch (action.type) {
    case ListConstants.LIST_INIT:
      let lists = action.lists.map(groceryList => {
        console.log(groceryList);
        return list(
          undefined,
          {
            type: ListConstants.LIST_INIT,
            ...groceryList
          }
        )
      });

      return [
        ...state,
        ...lists
      ];
    case ListConstants.LIST_ADD:
      return [
        ...state,
        list(undefined, action)
      ];
    case ListConstants.LIST_SAVE:
      return state.map(t =>
        list(t, action)
      );
    case ListConstants.LIST_DELETE:
      return state.filter(t => t.id !== action.id);
    default:
      return state
  }
};

export default lists
