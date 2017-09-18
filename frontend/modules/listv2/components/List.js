import React from 'react'
import PropTypes from 'prop-types'
import Item from './Item'

const List = ({ items, toggleItem, deleteItem }) => (
  <ul>
    {items.map(item =>
      <Item
        key={item.id}
        {...item}
        toggleItem={() => toggleItem(item)}
        deleteItem={() => deleteItem(item)}
      />
    )}
  </ul>
);

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired).isRequired,
  toggleItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired
};

export default List
