import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Todo = ({ todo, onDelete }) => (
    <div className="main"><div className="todo">
    <h2>
      {todo.todo_date}
      {' - '}
      {todo.todo_type}
      {"  "}
      <Link to={`/todos/${todo.id}/edit`}> ✎ </Link>
      <button className="delete" type="button" onClick={() => onDelete(todo.id)}> ✖ </button>
    </h2>
    <ul>
      <li>
        <strong>Type:</strong>
        {' '}
        {todo.todo_type}
      </li>
      <li>
        <strong>Date:</strong>
        {' '}
        {todo.todo_date}
      </li>
      <li>
        <strong>Done:</strong>
        {' '}
        {todo.done ? 'yes' : 'no'}
      </li>
    </ul>
    <Link className='btn more' to="/todos"> ← </Link>
  </div></div>
);

Todo.propTypes = {
  todo: PropTypes.shape(),
  onDelete: PropTypes.func.isRequired,
};

Todo.defaultProps = {
  todo: undefined,
};

export default Todo;