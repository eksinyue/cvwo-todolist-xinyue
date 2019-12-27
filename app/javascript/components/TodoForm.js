import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Pikaday from 'pikaday';
import 'pikaday/css/pikaday.css';
import { formatDate, isEmptyObject, validateTodo} from '../helpers/helpers';

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        todo: props.todo,
        errors: {},
      };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.dateInput = React.createRef();
  }

  componentDidMount() {
    new Pikaday({
      field: this.dateInput.current,
      toString: date => formatDate(date),
      onSelect: (date) => {
        const formattedDate = formatDate(date);
        this.dateInput.current.value = formattedDate;
        this.updateTodo('todo_date', formattedDate);
      },
    });
  }

  UNSAFE_componentWillReceiveProps({ todo }) {
    this.setState({ todo });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { todo } = this.state;
    const errors = validateTodo(todo);

    if (!isEmptyObject(errors)) {
      this.setState({ errors });
    } else {
      const { onSubmit } = this.props;
      onSubmit(todo);
    }
  }
  
  updateTodo(key, value) {
    this.setState(prevState => ({
      todo: {
        ...prevState.todo,
        [key]: value,
      },
    }));
  }

  handleInputChange(todo) {
    const { target } = todo;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.updateTodo(name, value);
  }

  renderErrors() {
    const { errors } = this.state;

    if (isEmptyObject(errors)) {
      return null;
    }

    return (
      <div className="errors">
        <h3>The following errors prohibited the todo from being saved:</h3>
        <ul>
          {Object.values(errors).map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    const { todo } = this.state;
    const { path } = this.props;
    const title = todo.id ? `${todo.title}` : 'New Todo';

    return (
      <div>
        <h2>{title}</h2>

        {this.renderErrors()}

        <form className="todoform" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="title">
              <strong>I need to ...</strong>
              <input type="text" id="title" name="title"
                    onChange={this.handleInputChange}
                    value={todo.title}
                     />
            </label>
          </div>

          <div>
            <label htmlFor="todo_date">
                <strong>It is due on ...</strong>
                <input
                type="text"
                id="todo_date"
                name="todo_date"
                ref={this.dateInput}
                autoComplete="off"
                value={todo.todo_date}
                onChange={this.handleInputChange}
                />
            </label>
          </div>

          <div>
            <label htmlFor="description">
              <strong>description:</strong>
              <input type="text" id="description" name="description"
                    onChange={this.handleInputChange}
                    value={todo.description}
                     />
            </label>
          </div>

          <div>
            <label htmlFor="todo_type">
              <strong>type:</strong>
              <input type="text" id="todo_type" name="todo_type"
                    onChange={this.handleInputChange}
                    value={todo.todo_type}
                     />
            </label>
          </div>

          <div>
            <label htmlFor="done">
              <strong>It is done !!</strong>
              <input type="checkbox" id="done" name="done" 
                    onChange={this.handleInputChange}
                    checked={todo.done}
                    />
            </label>
          </div>
            
            <button className='btn save' type="submit">Save</button>

        </form>
      </div>
    );
  }
}

TodoForm.propTypes = {
    todo: PropTypes.shape(),
    onSubmit: PropTypes.func.isRequired,
  };
  
TodoForm.defaultProps = {
todo: {
    todo_type: '',
    todo_date: '',
    title: '',
    description: '',
    done: false,
},
};

export default TodoForm;