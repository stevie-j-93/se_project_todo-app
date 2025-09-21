import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];

const counter = new TodoCounter(initialTodos, ".counter__text");
const todosList = document.querySelector(".todos__list");

function generateTodo(data) {
  const todo = new Todo(data, "#todo-template", (checked) => {
    counter.updateCompleted(checked);
  });
  return todo.getView();
}

function wireDeleteForCounter(el) {
  const checkbox = el.querySelector(".todo__completed");
  const deleteBtn = el.querySelector(".todo__delete-btn");
  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      if (checkbox?.checked) counter.updateCompleted(false);
      counter.updateTotal(false);
    });
  }
}

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const el = generateTodo(item);
    wireDeleteForCounter(el);
    section.addItem(el);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

const addTodoModal = new PopupWithForm("#add-todo-popup", (values, popup) => {
  const name = values.name;
  const dateStr = values.date;
  const date = dateStr ? new Date(dateStr) : null;
  if (date) date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const el = generateTodo({ id: uuidv4(), name, date, completed: false });
  wireDeleteForCounter(el);
  section.addItem(el, { prepend: true });
  counter.updateTotal(true);
  addTodoForm.reset();
  newTodoValidator.resetValidation();
  popup.close();
});

addTodoModal.setEventListeners();
addTodoButton.addEventListener("click", () => addTodoModal.open());

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
