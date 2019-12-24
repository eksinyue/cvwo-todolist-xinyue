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
  
  componentDidMount() {
    new Pikaday({
      field: this.dateInput.current,
      onSelect: (date) => {
        const formattedDate = formatDate(date);
        this.dateInput.current.value = formattedDate;
        this.updateTodo('todo_date', formattedDate);
      },
    });
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
    return (
      <div>
        <h2>New Todo</h2>
        {this.renderErrors()}
        <form className="todoform" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="todo_type">
              <strong>Type:</strong>
              <input type="text" id="todo_type" name="todo_type"
                    onChange={this.handleInputChange} />
            </label>
          </div>

          <div>
            <label htmlFor="todo_date">
                <strong>Date:</strong>
                <input
                type="text"
                id="todo_date"
                name="todo_date"
                ref={this.dateInput}
                autoComplete="off"
                />
            </label>
          </div>

          <div>
            <label htmlFor="done">
              <strong>Done:</strong>
              <input type="checkbox" id="done" name="done" 
                    onChange={this.handleInputChange}/>
            </label>
          </div>
          <div className="form-actions">
            <button type="submit">Save</button>
          </div>
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
    done: false,
},
};

export default TodoForm;