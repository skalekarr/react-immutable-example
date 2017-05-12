import { connect } from 'react-redux';

import * as components from './components';
import { addTodo, strikeTodo, removeTodo, updateTodo } from './actions';

export const TodoList = connect(
  function mapStateToProps(state) {
    return { todos: state };
  },
  function mapDispatchToProps(dispatch) {
    return {
        addTodo: text => dispatch(addTodo(text)),
        strikeTodo: id => dispatch(strikeTodo(id)),
        removeTodo: id => dispatch(removeTodo(id)),
        updateTodo: (id, text) => dispatch(updateTodo(id, text))
    };
  }
)(components.TodoList);