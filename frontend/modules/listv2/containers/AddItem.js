import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'
import ItemActions from '../actions/ItemActions'

let AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault();
        if (!input.value.trim()) {
          return
        }
        dispatch(ItemActions.add(input.value, 1));
        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
};
AddTodo = connect()(AddTodo);

export default AddTodo