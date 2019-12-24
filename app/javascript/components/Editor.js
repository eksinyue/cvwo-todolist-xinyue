import React from 'react';
import axios from 'axios';
import Header from './Header';
import TodoList from './TodoList';
import PropTypes from 'prop-types';
import PropsRoute from './PropsRoute';
import Todo from './Todo';
import { Switch } from 'react-router-dom';
import TodoForm from './TodoForm';
import { success } from '../helpers/notifications';
import { handleAjaxError } from '../helpers/helpers';

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: null,
    };

    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/todos.json')
      .then(response => this.setState({ todos: response.data }))
      .catch(handleAjaxError);
  }

  addTodo(newTodo) {
    axios
      .post('/api/todos.json', newTodo)
      .then((response) => {
        success('New Todo Added!');
        const savedTodo = response.data;
        this.setState(prevState => ({
          events: [...prevState.events, savedTodo],
        }));
        const { history } = this.props;
        history.push(`/todos/${savedEvent.id}`);
      })
      .catch(handleAjaxError);
  }

  deleteTodo(todoId) {
    const sure = window.confirm('Are you sure?');
    if (sure) {
      axios
        .delete(`/api/todos/${todoId}.json`)
        .then((response) => {
          if (response.status === 204) {
            success('Todo deleted');
            const { history } = this.props;
            history.push('/todos');

            const { todos } = this.state;
            this.setState({ todos: todos.filter(todo => todo.id !== todoId) });
          }
        })
        .catch(handleAjaxError);
    }
  }

  render() {
    const { todos } = this.state;
    if (todos === null) return null;

    const { match } = this.props;
    const todoId = match.params.id;
    const todo = todos.find(e => e.id === Number(todoId));

    return (
      <div>
        <Header />
        <div className="grid">
          <TodoList todos={todos} activeId={Number(todoId)}/>
          <Switch>
              <PropsRoute path="/todos/new" component={TodoForm} onSubmit={this.addTodo} />
              <PropsRoute path="/todos/:id" component={Todo} todo={todo}
                          onDelete={this.deleteTodo}/>
          </Switch>
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  match: PropTypes.shape(),
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

Editor.defaultProps = {
match: undefined,
};

export default Editor;