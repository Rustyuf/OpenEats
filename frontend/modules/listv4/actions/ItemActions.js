import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config'
import ItemConstants from '../constants/ItemConstants';

export const load = (list) => {
  return (dispatch) => {
    request()
      .get(serverURLs.list_item + '?list=' + list)
      .end((err, res) => {
        if (!err && res) {
          console.log(res.body.results);
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
          // AppDispatcher.dispatch({
          //   actionType: ListConstants.LIST_UPDATE_COUNT,
          //   increment: 1
          // });
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

export const toggle = (item) => {
  return (dispatch) => {
    request()
      .patch(serverURLs.list_item + item.id + "/")
      .send({completed: !item.completed})
      .end((err, res) => {
        if (!err && res) {
          dispatch({
            type: ItemConstants.ITEM_TOGGLE,
            id: item.id,
          });
        } else {
          console.error(err.toString());
          console.error(res.body);
        }
      });
  }
};

export const toggleAll = (checked) => {
  request()
    .patch(serverURLs.bulk_list_item)
    // .send(ItemStore.getToogleItems(checked))
    .send(1)
    .end((err, res) => {
      if (!err && res) {
        return {
          type: ItemConstants.ITEM_TOGGLE_ALL,
          checked: checked
        };
      } else {
        console.error(err.toString());
        console.error(res.body);
      }
    });
};

export const destroy = (item) => {
  return (dispatch) => {
    console.log(dispatch);
    request()
      .delete(serverURLs.list_item + item.id + "/")
      .end((err, res) => {
        if (!err && res) {
          dispatch({
            type: ItemConstants.ITEM_DELETE,
            id: item.id,
          });
          // AppDispatcher.dispatch({
          //   actionType: ListConstants.LIST_UPDATE_COUNT,
          //   increment: -1
          // });
        } else {
          console.error(err.toString());
          console.error(res.body);
        }
      });
  }
};

export const clearCompleted = () => {
  var ids = 1;
  request()
    .delete(serverURLs.bulk_list_item)
    .send(ids)
    .end((err, res) => {
      if (!err && res) {
        return {
          type: ItemConstants.ITEM_DELETE_COMPLETED,
        };
      } else {
        console.error(err.toString());
        console.error(res.body);
      }
    });
};
