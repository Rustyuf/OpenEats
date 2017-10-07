import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config'
import RecipeConstants from '../constants/RecipeConstants';
import history from '../../common/history'

export const load = (id) => {
  return (dispatch) => {
    request()
      .get(serverURLs.recipe + id + "/")
      .then(res => dispatch({type: RecipeConstants.RECIPE_LOAD, data: res.body}))
      .catch(err => { console.error(err); history.replace('/notfound'); })
  }
};
