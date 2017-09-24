import { combineReducers } from 'redux'
import items from './ItemReducer'
import lists from './ListReducer'

const list = combineReducers({
  items,
  lists
});

export default list
