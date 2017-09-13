import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'

const getVisibleTodos = (todos, filter, id) => {
  console.log(id);
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
    default:
      throw new Error('Unknown filter: ' + filter)
  }
};

const mapStateToProps = (state, ownProps) => ({
  todos: getVisibleTodos(state.list.todos, state.list.visibilityFilter, ownProps.list)
});

const mapDispatchToProps = ({
  onTodoClick: toggleTodo
});

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default VisibleTodoList
