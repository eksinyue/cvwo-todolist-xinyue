import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class TodoList extends React.Component {

  renderTodos() {
    const { todos } = this.props;
    todos.sort(
      (a, b) => new Date(b.todo_date) - new Date(a.todo_date),
    );

    return todos.map(todo => (
      <li key={todo.id}>
        <Link to={`/todos/${todo.id}`}>
          {todo.todo_date}
          {' - '}
          {todo.todo_type}
        </Link>
      </li>
    ));
  }

  render() {
    return (

      <div className="main"><div className="container">
        <h2>Todos</h2>
        <ul>
        {this.renderTodos()}
        </ul>
      </div></div>
      
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