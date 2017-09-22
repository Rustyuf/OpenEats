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
        ...items
      ];
    case ItemConstants.ITEM_ADD:
      return [
        ...state,
        item(undefined, action)
      ];
    case ItemConstants.ITEM_SAVE:
      return state.map(t =>
        item(t, action)
      );
    case ItemConstants.ITEM_TOGGLE:
      return state.map(t =>
        item(t, action)
      );
    case ItemConstants.ITEM_TOGGLE_ALL:
      // TODO: FIx this mess
      let new_State = state;
      for (let i in action.ids) {
        new_State = new_State.map(t =>
          item(
            t,
            {
              type: ItemConstants.ITEM_TOGGLE,
              id: action.ids[i].id,
            }
          )
        );
      }
      return new_State;
    case ItemConstants.ITEM_DELETE:
      return state.filter(t => t.id !== action.id);
    case ItemConstants.ITEM_DELETE_COMPLETED:
      let newState = state;
      for (let i in action.ids) {
        newState = newState.filter(t => t.id !== action.ids[i]);
      }
      return newState;
    default:
      return state
  }
};

export default items
