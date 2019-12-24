import { error } from './notifications';


export const formatDate = (d) => {
    const YYYY = d.getFullYear();
    const MM = `0${d.getMonth() + 1}`.slice(-2);
    const DD = `0${d.getDate()}`.slice(-2);
  
    return `${YYYY}-${MM}-${DD}`;
  };

  export const isEmptyObject = obj => Object.keys(obj).length === 0;

  export const validateTodo = (todo) => {
    const errors = {};
  
    if (todo.todo_type === '') {
      errors.todo_type = 'You must enter a todo type';
    }
  
    return errors;
  }

  export const handleAjaxError = (err) => {
    error('Something went wrong');
    console.warn(err);
  };