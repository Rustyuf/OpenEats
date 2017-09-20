import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  ENTER_KEY,
  ESCAPE_KEY
} from '../constants/ListStatus'


// const Item = ({ toggleItem, deleteItem, completed, title }) => {
//   let input;
//
//   // let handleEdit: function () {
//   //   this.props.onEdit();
//   //   this.setState({editText: this.props.item.title});
//   // },
//
//   return (
//     <li className={classNames({
//       completed: completed,
//       // editing: this.props.editing
//     })}>
//
//       <div className="view">
//         <input
//           className="toggle"
//           type="checkbox"
//           checked={ completed }
//           onChange={ toggleItem }
//         />
//         <label onDoubleClick={ toggleItem }>
//           { title }
//         </label>
//         <button className="destroy" onClick={ deleteItem } />
//       </div>
//       <input
//         ref={ node => {
//           input = node
//         }}
//         // ref="editField"
//         className="edit"
//         value={ title }
//         // onBlur={this.handleSubmit}
//         // onChange={ this.handleChange }
//         // onKeyDown={this.handleKeyDown}
//       />
//     </li>
//   )
// };


class Item extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);

    this.state = {
      editing: this.props.editing || false,
      editText: this.props.item.title || ''
    };
  }

  handleSubmit(event) {
    let val = this.state.editText.trim();
    if (val) {
      this.props.onSave(val);
      this.setState({editText: val});
    } else {
      this.props.onDestroy();
    }
  }

  handleEdit() {
    this.props.onEdit();
    this.setState({editText: this.props.item.title});
  }

  handleKeyDown(event) {
    if (event.which === ESCAPE_KEY) {
      this.setState({editText: this.props.item.title});
      this.props.onCancel(event);
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit(event);
    }
  }

  handleChange(event) {
    if (this.state.editing) {
      this.setState({editText: event.target.value});
    }
  }

  render() {
    return (
      <li className={classNames({
        completed: this.props.item.completed,
        // editing: this.props.editing
      })}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.item.completed}
            onChange={this.props.onToggle}
          />
          <label onDoubleClick={this.handleEdit}>
            {this.props.item.title}
          </label>
          {/*<button className="destroy" onClick={this.props.actions.destroy(this.props.item)} />*/}
        </div>
        {/*<input*/}
          {/*ref="editField"*/}
          {/*className="edit"*/}
          {/*value={this.state.editText}*/}
          {/*onBlur={this.handleSubmit}*/}
          {/*onChange={this.handleChange}*/}
          {/*onKeyDown={this.handleKeyDown}*/}
        {/*/>*/}
      </li>
    );
  }
}




// Item.propTypes = {
//   toggleItem: PropTypes.func.isRequired,
//   deleteItem: PropTypes.func.isRequired,
//   completed: PropTypes.bool.isRequired,
//   title: PropTypes.string.isRequired
// };

export default Item
