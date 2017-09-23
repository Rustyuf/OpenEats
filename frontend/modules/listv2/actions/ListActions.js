import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config'
import ListConstants from '../constants/ListConstants';
import { browserHistory } from 'react-router'

export const add = (title) => {
  return (dispatch) => {
    request()
      .post(serverURLs.list)
      .send({title: title})
      .end((err, res) => {
        if (!err && res) {
          dispatch({
            type: ListConstants.LIST_ADD,
            id: res.body.id,
            title: res.body.title,
            item_count: 0
          });
          browserHistory.push('/list/' + res.body.id);
        } else {
          console.error(err.toString());
          console.error(res.body);
          this.error(res.body);
        }
      });
  }
};

export const save = (id, title) => {
  return (dispatch) => {
    request()
      .patch(serverURLs.list + id + "/")
      .send({title: title})
      .end((err, res) => {
        if (!err && res) {
          dispatch({
            type: ListConstants.LIST_SAVE,
            id: id,
            title: res.body.title
          });
        } else {
          console.error(err.toString());
          console.error(res.body);
          this.error(res.body);
        }
      });
  }
};

export const destroy = (id) => {
  return (dispatch) => {
    request()
      .delete(serverURLs.list + id + "/")
      .end((err, res) => {
        if (!err && res) {
          dispatch({
            type: ListConstants.LIST_DELETE,
            id: id,
          });
          browserHistory.push('/list/');
        } else {
          console.error(err.toString());
          console.error(res.body);
          this.error(res.body);
        }
      });
  }
};

export const load = () => {
  return (dispatch) => {
    request()
      .get(serverURLs.list)
      .end((err, res) => {
        if (!err && res) {
          dispatch({
            type: ListConstants.LIST_INIT,
            lists: res.body.results,
          });
        } else {
          console.error(err.toString());
          console.error(res.body);
          this.error(res.body);
        }
      });
  }
};
