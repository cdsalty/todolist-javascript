// console.log("sanity-check");

const storageKey = "tutorial_todos";

const convertStringToObj = str => JSON.parse(str) || [];

const convertObjectToString = obj => JSON.stringify(obj) || "";

// Get Todos:
const getTodos = () => convertStringToObj(localStorage.getItem(storageKey)); // local storage has it's own api/function getItem

// Add ToDo Item:
// convert to string, get current list of todos using spread operator and then add the new todo to it
const addTodo = todo =>
  localStorage.setItem(
    storageKey,
    convertObjectToString([...getTodos(), todo])
  );

// Delete Todo:
const deleteTodo = todo =>
  localStorage.setItem(
    storageKey,
    convertObjectToString(getTodos().filter(curnt_todo => curnt_todo !== todo))
  );

// Build/Create the actual todo element
const buildTodoElement = todo => {
  const el = document.createElement("li"); // create the actual <li></li>
  el.classList.add("list-group-item"); // give it a class name of "list-group-item" to be inline the way the html is setup
  el.innerText = todo; // set the text to 'todo'
  return el; // return the created element
}; // why el and not todo?

const appendLiToDom = el =>
  document.getElementById("todo-list-container").appendChild(el);
// grabs the ul from the dom and then passes the element into it.

// To Clear/Completely remove the list items from the view
const clearTodoListDisplay = (document.getElementById(
  "todo-list-container"
).innerHTML = "");

// Clear the input (current) and once it's submitted, you want to remove whatever was entered into the input.
const clearInput