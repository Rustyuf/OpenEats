let nextTodoId = 0
import ItemConstants from '../constants/ItemConstants'


export const addTodo = (text) => {

  console.log('action');

  return {
    type: ItemConstants.ITEM_ADD,
    id: nextTodoId++,
    text
  }
}

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = (id) => ({
  type: ItemConstants.ITEM_TOGGLE,
  id
})
