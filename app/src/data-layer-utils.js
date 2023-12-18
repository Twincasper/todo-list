import initialTodos from './todos.json';

//////////////////////////////////
// Generic localStorage Helpers //
//////////////////////////////////

// sets a new key-value pair in local storage.
const setLocalStorageKey = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// tries to get a value from local storage.
const getLocalStorageKey = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.error(error);
    return null;
  }
}

///////////////////////
// Todo List Helpers //
///////////////////////

// Note: We export only these, to create an API for our data layer

// sets the todos Array in localStorage with the key 'todos'
export const setTodos = (todos) => {
  setLocalStorageKey('todos',todos);
}
// returns the Array of all todo Objects from localStorage
export const getAllTodos = () => {
 return getLocalStorageKey('todos') || [];
} 
// adds a new todo Object to the Array of todos in localStorage
export const addTodo = (todo) => {
  const todos = getAllTodos();
  todos.push(todo);
  setTodos(todos);
} 
// finds a todo by uuid and toggles the found todo's isComplete property 
export const toggleTodoComplete = (uuid) => { 
  const todos = getAllTodos();
  const updatedTodos = todos.map((todo) => {
    if (todo.uuid === uuid) {
      return { ...todo, isComplete: !todo.isComplete };
    } 
    return todo;
  });
  setTodos(updatedTodos);
} 
// finds a todo by uuid and removes it from the Array of todos
export const deleteTodo = (uuid) => {
  const todos = getAllTodos();
  const updatedTodos = todos.filter((todo) => todo.uuid !== uuid);
  setTodos(updatedTodos);
 } 
// stores todos from the todos.json file in localStorage, but only if localStorage doesn't have them already
export const initializeTodosIfEmpty = () => {
  if (getAllTodos().length === 0) setLocalStorageKey('todos', initialTodos);
}

const renderTodoCard = (todo) => {
  const todosList = document.querySelector("ul#todos-list");
  const li = document.createElement('li');
  const h3 = document.createElement('h3');

  li.dataset.uuid = todo.uuid;
  li.classList.add('todo-card');
  h3.textContent = todo.title;

  const labelInputButton = document.createElement('div');
  labelInputButton.innerHTML = `
    <div class='label-input-container'>
      <label>Complete</label>
      <input type="checkbox" name="isComplete" ${todo.isComplete ? "checked" : ""}>
    </div>
    <button class='delete-todo'>🗑️</button>`;
  li.append(h3, labelInputButton);
  todosList.append(li);
}

const renderTodos = () => {
  document.querySelector('ul#todos-list').innerHTML = "";
  getAllTodos().forEach(renderTodoCard);
}
