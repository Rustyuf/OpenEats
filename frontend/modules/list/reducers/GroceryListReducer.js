import { combineReducers } from 'redux'
import { default as items } from './ItemReducer'
import { default as lists } from './ListReducer'

const list = combineReducers({
  items,
  lists
});

export default list
