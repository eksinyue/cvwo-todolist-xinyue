import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class TodoList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      sortBy: 'created',
    };

    this.searchInput = React.createRef();
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.updateSortBy = this.updateSortBy.bind(this);
  }

  updateSearchTerm() {
    this.setState({ searchTerm: this.searchInput.current.value });
  }

  updateSortBy(e) {
    this.setState({ sortBy: e});
  }

  matchSearchTerm(obj) {
    const {
      id, done, created_at, updated_at, ...rest
    } = obj;
    const { searchTerm, sortBy } = this.state;
  
    return Object.values(rest).some(
      value => (value||'').toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    );
  }

  renderTodos() {
    const { activeId, todos } = this.props;
    let sortTodos = todos
    .filter(el => this.matchSearchTerm(el));

    if (this.state.sortBy === 'due') {
      sortTodos = sortTodos.sort(
                (a, b) => new Date(a.todo_date) - new Date(b.todo_date),);
      sortTodos = sortTodos.filter(todo => todo.todo_date !== null)
                .concat(sortTodos.filter(todo => todo.todo_date === null).sort(
                  (a, b) => new Date(b.created_at) - new Date(a.created_at)));
    } else if (this.state.sortBy === 'created') {
      sortTodos = sortTodos.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at),);
    } else {}

    const filteredTodos = (sortTodos.filter(todo => !todo.done))
    .concat(sortTodos.filter(todo => todo.done));

    return filteredTodos.map(todo => (
      <li key={todo.id} className={todo.done ? 'tododone' : ''} >
        <Link to={`/todos/${todo.id}`} className={activeId === todo.id ? 'active' : ''}>
          <span>
          {todo.todo_type}
          <b>
          {todo.todo_date === null ? '' : '    - '}
          {todo.todo_date}
          </b>
          </span>
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
            <Link className='btn more' to="/todos"> ≡ </Link>
          </h2>
          
            <Link className='btn more sort' type='button' onClick={()=>this.updateSortBy('created')}> by created date </Link>
            <Link className='btn more sort' type='button' onClick={()=>this.updateSortBy('due')}> sort by due date </Link> 
          
        </div>
        
        <div className="todolist">
          <form className='searchbar'>
              <input
                type="text"
                placeholder="Search (by title, due date ...)"
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