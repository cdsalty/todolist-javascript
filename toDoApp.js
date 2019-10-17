// console.log("sanity-check");

const storageKey = "tutorial_todos";

const convertStringToObj = str => JSON.parse(str) || [];

const convertObjectToString = obj => JSON.stringify(obj) || "";

// Get Todos:
const getTodos = () => convertStringToObj(localStorage.getItem(storageKey)); // local storage has it's own api/function getItem

// Add ToDo Item:
const addTodo = todo =>
  localStorage.setItem(
    storageKey,
    convertObjectToString([...getTodos(), todo]) // use of spread operator
  );

// Delete Todo: ANYTIME a delete todo is called, it will be followed by a refresh displayTodos
const deleteTodo = todo =>
  localStorage.setItem(
    storageKey,
    convertObjectToString(getTodos().filter(curnt_todo => curnt_todo !== todo))
  );

// Build/Create the actual todo element
const buildTodoElement = todo => {
  const el = document.createElement("li");
  el.classList.add("list-group-item");
  el.innerText = todo;
  return el;
};
// append the list item to the/inside the todo-list-container (the ul in the application)
const appendLiToDom = el =>
  document.getElementById("todo-list-container").appendChild(el); // get the list, add the child to it

// clear-out/delete the list item
const clearTodoListDisplay = () => {
  document.getElementById("todo-list-container").innerHTML = "";
};
// after text submitted, clear input form
const clearInput = () => (document.getElementById("new-todo-input").value = "");

// * BUILDIING THE TODO AND UI
const displayTodos = () => {
  clearInput();
  clearTodoListDisplay();
  getTodos().forEach(_todo => appendLiToDom(buildTodoElement(_todo))); //get Todos stored, forEach one, append it to the list, it being the built element with the text inside
  initClickListensers(); // once todos are loaded, then this is called
};

// create and initialize all of our event listeners once our each of our todos has been loaded
const initClickListensers = () => {
  Array.from(document.getElementsByClassName("list-group-item")) // get a query, convert to array type in order to run array functions
    .forEach(_item => {
      _item.addEventListener("click", $event => {
        const todo = $event.target.innerText; // which event the user clicked on
        if (window.confirm("Task Complete: " + todo)) {
          // 2 step confirmation process before deleting
          // ok = true, cancel = false
          // if they do click "ok," take the appropriate steps:
          deleteTodo(todo);
          displayTodos();
        }
      });
    });
};
// when the dom loads, display todos
// REVIEW
document.addEventListener("DOMContentLoaded", () => displayTodos()); // when the dom loads, display todos

// TO ADD TODOS
document
  .getElementById("submit-new-todo-btn")
  .addEventListener("click", $event => {
    const newTodoInput = document.getElementById("new-todo-input");
    if (newTodoInput.value) {
      // SIMPLE: IF IT HAS A VALUE THEN PROCEED
      addTodo(newTodoInput.value.trim()); //remove white-space on the ends
      displayTodos();
    }
  });

/* Create an event to reset our local storage
  - create a function that listens for clicks on 'reset local storage'
  - reset local local storage
*/
document
  .getElementById("reset-storage-btn")
  .addEventListener("click", $event => {
    localStorage.removeItem(storageKey);
    displayTodos(); // once we clear, we want to then display the list
    clearInput();
  });
