import React from 'react';
import PropTypes from 'prop-types';

class TodoList extends React.Component {
  renderTodos() {
    const { todos } = this.props;
    todos.sort(
      (a, b) => new Date(b.todo_date) - new Date(a.todo_date),
    );

    return todos.map(todo => (
      <li key={todo.id}>
        {todo.todo_date}
        {' - '}
        {todo.todo_type}
      </li>
    ));
  }

  render() {
    return (
      <section>
        <h2>Todos</h2>
        <ul>{this.renderTodos()}</ul>
      </section>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
};

TodoList.defaultProps = {
  todos: [],
};

export default TodoList;