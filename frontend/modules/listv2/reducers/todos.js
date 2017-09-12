import ItemConstants from '../constants/ItemConstants'

const item = (state, action) => {
  switch (action.type) {
    case ItemConstants.ITEM_ADD:
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case ItemConstants.ITEM_SAVE:
      if (state.id !== action.id) {
        return state
      }

      return {
        id: state.id,
        text: action.text,
        completed: state.completed
      };
    case ItemConstants.ITEM_TOGGLE:
      if (state.id !== action.id) {
        return state
      }

      return {
        id: state.id,
        text: state.text,
        completed: !state.completed
      };
    default:
      return state
  }
};

const items = (state = [], action) => {
  switch (action.type) {
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
