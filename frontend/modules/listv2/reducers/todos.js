import ItemConstants from '../constants/ItemConstants'

const item = (state, action) => {
  switch (action.type) {
    case ItemConstants.ITEM_INIT:
      return {
        id: action.id,
        title: action.title,
        completed: false
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
        id: state.id,
        title: state.title,
        completed: !state.completed
      };
    default:
      return state
  }
};

const items = (state = [], action) => {
  switch (action.type) {
    case ItemConstants.ITEM_INIT:
      let items = action.list.map(itemi => {
        return item(
          undefined,
          {
            type: ItemConstants.ITEM_INIT,
            id: itemi.id,
            title: itemi.title,
            completed: itemi.completed
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
    default:
      return state
  }
};

export default items
