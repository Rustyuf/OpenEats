let nextTodoId = 0
import ItemConstants from '../constants/ItemConstants'

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = (id) => ({
  type: ItemConstants.ITEM_TOGGLE,
  id
})
