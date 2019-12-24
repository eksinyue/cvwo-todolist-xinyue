import React from 'react';
import axios from 'axios';
import Header from './Header';
import TodoList from './TodoList';
import PropTypes from 'prop-types';
import PropsRoute from './PropsRoute';
import Todo from './Todo';

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: null,
    };
  }

  componentDidMount() {
    axios
      .get('/api/todos.json')
      .then(response => this.setState({ todos: response.data }))
      .catch((error) => {
        console.log(error);
      });
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
        <TodoList todos={todos} />
        <PropsRoute path="/todos/:id" component={Todo} todo={todo} />
      </div>
    );
  }
}

Editor.propTypes = {
match: PropTypes.shape(),
};

Editor.defaultProps = {
match: undefined,
};

export default Editor;