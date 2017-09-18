import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

//
// {/*<li*/}
//   {/*onClick={onClick}*/}
//   {/*style={{*/}
//     {/*textDecoration: completed ? 'line-through' : 'none'*/}
//   {/*}}*/}
// {/*>*/}
//   {/*{title}*/}
// {/*</li>*/}

const Item = ({ toggleItem, deleteItem, completed, title }) => {
  let input;

  // let handleEdit: function () {
  //   this.props.onEdit();
  //   this.setState({editText: this.props.item.title});
  // },

  return (
    <li className={classNames({
      completed: completed,
      // editing: this.props.editing
    })}>

      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={ completed }
          onChange={ toggleItem }
        />
        <label onDoubleClick={ toggleItem }>
          { title }
        </label>
        <button className="destroy" onClick={ deleteItem } />
      </div>
      <input
        ref={ node => {
          input = node
        }}
        // ref="editField"
        className="edit"
        value={ title }
        // onBlur={this.handleSubmit}
        // onChange={ this.handleChange }
        // onKeyDown={this.handleKeyDown}
      />
    </li>
  )
};

Item.propTypes = {
  toggleItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

export default Item
