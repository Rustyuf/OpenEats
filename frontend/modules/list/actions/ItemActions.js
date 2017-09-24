import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config'
import ItemConstants from '../constants/ItemConstants';

export const load = (list) => {
  return (dispatch) => {
    request()
      .get(serverURLs.list_item + '?list=' + list)
      .end((err, res) => {
        if (!err && res) {
          dispatch({
            type: ItemConstants.ITEM_INIT,
            list: res.body.results
          });
        } else {
          console.error(err.toString());
          console.error(res.body);
        }
      });
  }
};

export const add = (title, list) => {
  return (dispatch) => {
    request()
      .post(serverURLs.list_item)
      .send({
        title: title,
        list: list
      })
      .end((err, res) => {
        if (!err && res) {
          dispatch({
            type: ItemConstants.ITEM_ADD,
            id: res.body.id,
            title: res.body.title
          });
        } else {
          console.error(err.toString());
          console.error(res.body);
        }
      });
  }
};

export const save = (item, title) => {
  return (dispatch) => {
    request()
      .patch(serverURLs.list_item + item.id + "/")
      .send({title: title})
      .end((err, res) => {
        if (!err && res) {
          dispatch({
            type: ItemConstants.ITEM_SAVE,
            id: item.id,
            title: res.body.title
          });
        } else {
          console.error(err.toString());
          console.error(res.body);
        }
      });
  }
};

export const toggle = (id, completed) => {
  return (dispatch) => {
    request()
      .patch(serverURLs.list_item + id + "/")
      .send({completed: completed})
      .end((err, res) => {
        if (!err && res) {
          dispatch({
            type: ItemConstants.ITEM_TOGGLE,
            id: id,
          });
        } else {
          console.error(err.toString());
          console.error(res.body);
        }
      });
  }
};

export const toggleAll = (ids) => {
  return (dispatch) => {
    request()
      .patch(serverURLs.bulk_list_item)
      .send(ids)
      .end((err, res) => {
        if (!err && res) {
          dispatch({
            type: ItemConstants.ITEM_TOGGLE_ALL,
            ids: ids
          });
        } else {
          console.error(err.toString());
          console.error(res.body);
        }
      });
  }
};

export const destroy = (id) => {
  return (dispatch) => {
    request()
      .delete(serverURLs.list_item + id + "/")
      .end((err, res) => {
        if (!err && res) {
          dispatch({
            type: ItemConstants.ITEM_DELETE,
            id: id,
          });
        } else {
          console.error(err.toString());
          console.error(res.body);
        }
      });
  }
};

export const clearCompleted = (ids) => {
  return (dispatch) => {
    request()
      .delete(serverURLs.bulk_list_item)
      .send(ids)
      .end((err, res) => {
        if (!err && res) {
          dispatch({
            type: ItemConstants.ITEM_DELETE_COMPLETED,
            ids: ids,
          });
        } else {
          console.error(err.toString());
          console.error(res.body);
        }
      });
  }
};
