import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Todo = ({ todo, onDelete }) => (
    <div className="main"><div className="todo">
    <h2>
      {todo.title}
      {"  "}
      <Link className='btn more' type="button" onClick={() => onDelete(todo.id)}> ✖ </Link>
      <Link className='btn more' to={`/todos/${todo.id}/edit`}> ✎ </Link>
    </h2>
    <ul>
      <li>
        <strong>I need to </strong>
        {' '}
        {todo.title}
      </li>
      <li>
        <strong>It is due on </strong>
        {' '}
        {todo.todo_date}
      </li>
      <li>
        <strong>description: </strong>
        {' '}
        {todo.description}
      </li>
      <li>
        <strong>tag:</strong>
        {' '}
        {todo.todo_type}
      </li>
      <li>
        <strong> done? </strong>
        {'  '}
        {todo.done ? 'yes' : 'not yet'}
      </li>
    </ul>
    <Link className='btn more' to="/todos"> ↩ </Link>
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