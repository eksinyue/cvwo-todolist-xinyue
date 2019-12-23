import React from 'react';
import axios from 'axios';
import Header from './Header';
import TodoList from './TodoList';

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

    return (
      <div>
        <Header />
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default Editor;