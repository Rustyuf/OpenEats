import RecipeConstants from '../constants/RecipeConstants'

const recipes = (state = [], action) => {
  switch (action.type) {
    case RecipeConstants.RECIPE_LOAD:
      // TODO: clean this up.
      let recipe = state.find(t => t.id === action.data.id);
      if (recipe) {
        return state.map(recipe => {
          if (recipe.id === action.data.id) {
            return { ...action.data }
          }
          return recipe;
        });
      } else {
        return [
          ...state,
          { ...action.data }
        ]
      }
    default:
      return state
  }
};

export default recipes
