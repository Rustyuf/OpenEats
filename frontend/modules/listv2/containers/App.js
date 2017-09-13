import React from 'react'
import Footer from '../components/Footer'
import AddTodo from './AddTodo'
import { connect } from 'react-redux'
import VisibleTodoList from './VisibleTodoList'
import ItemActions from '../actions/ItemActions'

let App = ({ dispatch, params }) => {
  dispatch(ItemActions.load(params.listId));

  return (
    <div>
      <AddTodo/>
      <VisibleTodoList list={ params.listId || 0 }/>
      <Footer/>
    </div>
  )
};

App = connect()(App);

export default App
