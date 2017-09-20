import { combineReducers } from 'redux'
import items from './items'
import lists from './lists'

const list = combineReducers({
  items,
  lists
});

export default list
