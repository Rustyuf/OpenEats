import { combineReducers } from 'redux'
import {default as list} from '../list/reducers/GroceryListReducer'

const reducer = combineReducers({
  list,
});

export default reducer
