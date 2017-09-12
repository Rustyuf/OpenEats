import { combineReducers } from 'redux'
import {default as list} from '../listv2/reducers/index'

const reducer = combineReducers({
  list,
});

export default reducer
