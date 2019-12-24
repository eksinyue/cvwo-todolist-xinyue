import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class TodoList extends React.Component {

  renderTodos() {
    const { activeId, todos } = this.props;
    todos.sort(
      (a, b) => new Date(b.todo_date) - new Date(a.todo_date),
    );

    return todos.map(todo => (
      <li key={todo.id}>
        <Link to={`/todos/${todo.id}`} className={activeId === todo.id ? 'active' : ''}>
          {todo.todo_date}
          {' - '}
          {todo.todo_type}
        </Link>
      </li>
    ));
  }

  render() {
    return (

      <div className="main">
        <div className='maxwidth container'>
          <h2>
            Todos <Link className='btn more' to="/todos/new"> + </Link> 
            <Link className='btn more' to="/todos"> ← </Link>
          </h2>
        </div>
        <div className="todolist">
          <ul>{this.renderTodos()}</ul>
        </div>
      </div>

    );
  }
}

TodoList.propTypes = {
  activeId: PropTypes.number,
  todos: PropTypes.arrayOf(PropTypes.object),
};

TodoList.defaultProps = {
  activeId: undefined,
  todos: [],
};

export default TodoList;