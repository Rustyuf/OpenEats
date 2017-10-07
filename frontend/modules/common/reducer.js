import { combineReducers } from 'redux'
import { default as list } from '../list/reducers/GroceryListReducer'
import { default as recipes } from '../recipe/reducers/RecipeReducer'

const reducer = combineReducers({
  list,
  recipes,
});

export default reducer
