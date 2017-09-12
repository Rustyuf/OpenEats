import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config'
import ItemConstants from '../constants/ItemConstants';
import { ItemStore } from '../stores/ItemStore';

class ItemActions {
  load(id) {
    request()
      .get(serverURLs.list_item + '?list=' + id)
      .end((err, res) => {
        if (!err && res) {
          return {
            type: ItemConstants.ITEM_INIT,
            id: id,
            list: res.body
          };
        } else {
          console.error(err.toString());
          console.error(res.body);
          this.error(res.body);
        }
      });
  }

  add(title) {
    request()
      .post(serverURLs.list_item)
      .send({
        title: title,
        // list: ItemStore.getKey()
      })
      .end((err, res) => {
        if (!err && res) {
          return {
            type: ItemConstants.ITEM_ADD,
            data: res.body
          };
          // AppDispatcher.dispatch({
          //   actionType: ListConstants.LIST_UPDATE_COUNT,
          //   increment: 1
          // });
        } else {
          console.error(err.toString());
          console.error(res.body);
          this.error(res.body);
        }
      });
  }

  save(item, title) {
    request()
      .patch(serverURLs.list_item + item.id + "/")
      .send({ title: title })
      .end((err, res) => {
        if (!err && res) {
          return {
            type: ItemConstants.ITEM_SAVE,
            id: item.id,
            text: res.body.title
          };
        } else {
          console.error(err.toString());
          console.error(res.body);
          this.error(res.body);
        }
      });
  }

  toggle(item) {
    request()
      .patch(serverURLs.list_item + item.id + "/")
      .send({ completed: !item.completed })
      .end((err, res) => {
        if (!err && res) {
          return {
            type: ItemConstants.ITEM_TOGGLE,
            id: item.id,
          };
        } else {
          console.error(err.toString());
          console.error(res.body);
          this.error(res.body);
        }
      });
  }

  toggleAll(checked) {
    request()
      .patch(serverURLs.bulk_list_item)
      .send(ItemStore.getToogleItems(checked))
      .end((err, res) => {
        if (!err && res) {
          return {
            type: ItemConstants.ITEM_TOGGLE_ALL,
            checked: checked
          };
        } else {
          console.error(err.toString());
          console.error(res.body);
          this.error(res.body);
        }
      });
  }

  destroy(item) {
    request()
      .delete(serverURLs.list_item + item.id + "/")
      .end((err, res) => {
        if (!err && res) {
          return {
            type: ItemConstants.ITEM_DELETE,
            id: item.id,
          };
          // AppDispatcher.dispatch({
          //   actionType: ListConstants.LIST_UPDATE_COUNT,
          //   increment: -1
          // });
        } else {
          console.error(err.toString());
          console.error(res.body);
          this.error(res.body);
        }
      });
  }

  clearCompleted() {
    var ids = ItemStore.getCheckedItems();
    request()
      .delete(serverURLs.bulk_list_item)
      .send(ids)
      .end((err, res) => {
        if (!err && res) {
          return {
            type: ItemConstants.ITEM_DELETE_COMPLETED,
          };
          // AppDispatcher.dispatch({
          //   actionType: ListConstants.LIST_UPDATE_COUNT,
          //   increment: -ids.length
          // });
        } else {
          console.error(err.toString());
          console.error(res.body);
          this.error(res.body);
        }
      });
  }
}

const ItemAction = new ItemActions();

export default ItemAction;
