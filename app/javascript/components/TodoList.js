import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class TodoList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };

    this.searchInput = React.createRef();
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
  }

  updateSearchTerm() {
    this.setState({ searchTerm: this.searchInput.current.value });
  }

  matchSearchTerm(obj) {
    const {
      id, done, created_at, updated_at, ...rest
    } = obj;
    const { searchTerm } = this.state;
  
    return Object.values(rest).some(
      value => value.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    );
  }

  renderTodos() {
    const { activeId, todos } = this.props;
    const filteredTodos = todos
    .filter(el => this.matchSearchTerm(el))
    .sort(
      (a, b) => new Date(b.todo_date) - new Date(a.todo_date),
    );

    return filteredTodos.map(todo => (
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
          <form className='searchbar'>
              <input
                type="text"
                placeholder="Search"
                ref={this.searchInput}
                onKeyUp={this.updateSearchTerm}
              />
            </form>
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