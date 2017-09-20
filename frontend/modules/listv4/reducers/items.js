import ItemConstants from '../constants/ItemConstants'

const item = (state, action) => {
  switch (action.type) {
    case ItemConstants.ITEM_INIT:
      return {
        ...action
      };
    case ItemConstants.ITEM_ADD:
      return {
        id: action.id,
        title: action.title,
        completed: false
      };
    case ItemConstants.ITEM_SAVE:
      if (state.id !== action.id) {
        return state
      }

      return {
        id: state.id,
        title: action.title,
        completed: state.completed
      };
    case ItemConstants.ITEM_TOGGLE:
      if (state.id !== action.id) {
        return state
      }

      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state
  }
};

const items = (state = [], action) => {
  switch (action.type) {
    case ItemConstants.ITEM_INIT:
      let items = action.list.map(listItem => {
        return item(
          undefined,
          {
            type: ItemConstants.ITEM_INIT,
            ...listItem
          }
        )
      });

      return [
        ...state,
        ...items
      ];
    case ItemConstants.ITEM_ADD:
      return [
        ...state,
        item(undefined, action)
      ];
    case ItemConstants.ITEM_TOGGLE:
      return state.map(t =>
        item(t, action)
      );
    case ItemConstants.ITEM_DELETE:
      return state.filter(t => t.id !== action.id);
    default:
      return state
  }
};

export default items
