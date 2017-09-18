import { combineReducers } from 'redux'
import items from './items'
import visibilityFilter from './visibilityFilter'

const list = combineReducers({
  items,
  visibilityFilter
});

export default list
