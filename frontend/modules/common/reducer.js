import { combineReducers } from 'redux'
import {default as list} from '../list/reducers/index'

const reducer = combineReducers({
  list,
});

export default reducer
