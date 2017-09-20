import React from 'react'
import Footer from '../components/Footer'
import AddItem from './AddItem'
import { connect } from 'react-redux'
import VisibleItems from './VisibleItems'
import { load } from '../actions/ItemActions'

let App = ({ dispatch, params }) => {
  dispatch(load(params.listId));

  return (
    <div>
      <AddItem/>
      <VisibleItems list={ params.listId || 0 }/>
      <Footer/>
    </div>
  )
};

App = connect()(App);

export default App
