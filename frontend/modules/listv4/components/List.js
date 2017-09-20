import React from 'react'
import PropTypes from 'prop-types'
import Item from './Item'

const List = ({ items, toggleItem, deleteItem, actions123 }) => (
  <ul>
    {console.log(items)}
    {items.map(item =>
      <Item
        key={item.id}
        item={item}
        toggleItem={() => toggleItem(item)}
        deleteItem={() => deleteItem(item)}
        actions={actions123}
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
