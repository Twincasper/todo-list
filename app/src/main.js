import './style.css'
import initialTodos from './todos.json';
import { v4 as uuidv4 } from 'uuid';
import { getAllTodos, initializeTodosIfEmpty, addTodo, toggleTodoComplete, deleteTodo } from './data-layer-utils';

const handleNewTodo = (e) => {
  e.preventDefault();

  const form = e.target;
  const newTodo = {
    uuid: uuidv4(),
    title: form.todoTitle.value,
    isComplete: false
  }

  addTodo(newTodo);
  
  form.reset();
};

const main = () => {
  const form = document.querySelector("form#new-todo-form");
  form.addEventListener('submit', handleNewTodo);
  
};

main();

