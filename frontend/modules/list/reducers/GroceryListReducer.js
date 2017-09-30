import { combineReducers } from 'redux'
import { default as items } from './ItemReducer'
import { default as lists } from './ListReducer'
import { default as error } from './ErrorReducer'

const list = combineReducers({
  items,
  lists,
  error
});

export default list
