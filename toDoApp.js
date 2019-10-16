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

// Delete Todo:
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
const clearTodoListDisplay = (document.getElementById(
  "todo-list-container"
).innerHTML = "");

// after text submitted, clear input form
const clearInput = () => document.getElementById("new-todo-input").value;

// * BUILDIING THE TODO AND UI
const displayTodos = () => {
  clearInput();
  clearTodoListDisplay();
  getTodos().forEach(_todo => appendLiToDom(buildTodoElement(_todo))); //get Todos stored, forEach one, append it to the list, it being the built element with the text inside
  initClickListensers(); // once todos are loaded, then this is called
};

// create and initialize all of our event listeners once our each of our todos has been loaded
const initClickListensers = () => {
  Array.from(document.getElementsByClassName("list-group-item")).forEach(
    _item => {
      _item.addEventListener("click", $event => {
        const todo = $event.target.innerText;
        if (window.confirm("Task Complete: " + todo)) {
          // ok = true, cancel = false
          // if they do click "ok," take the appropriate steps:
          deleteTodo(todo);
          displayTodos();
        }
      });
    }
  );
};

// Create an event to reset our local storage
