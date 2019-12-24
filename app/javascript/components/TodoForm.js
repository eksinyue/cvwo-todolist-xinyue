import React from 'react';

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('submitted');
  }

  render() {
    return (
      <div>
        <h2>New Todo</h2>
        <form className="todoform" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="todo_type">
              <strong>Type:</strong>
              <input type="text" id="todo_type" name="todo_type" />
            </label>
          </div>

          <div>
            <label htmlFor="todo_date">
              <strong>Date:</strong>
              <input type="text" id="todo_date" name="todo_date" />
            </label>
          </div>

          <div>
            <label htmlFor="done">
              <strong>Done:</strong>
              <input type="checkbox" id="done" name="done" />
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

export default TodoForm;