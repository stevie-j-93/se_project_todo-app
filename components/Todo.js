class Todo {
  constructor(data, selector, handleCheck) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._handleCheck = handleCheck;
    this._completed = !!data.completed;
  }

  _toggleCompletion = () => {
    this._completed = !!this._todoCheckboxEl.checked;
    this._data.completed = this._completed;

    this._todoElement.classList.toggle("todo_completed", this._completed);
  };

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", (e) => {
      const checked = e.target.checked;
      this._data.completed = checked;
      this._completed = checked;
      this._todoElement.classList.toggle("todo_completed", checked);
      this._handleCheck?.(checked);
    });

    const todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
    });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = !!this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
    this._todoElement.classList.toggle(
      "todo_completed",
      this._todoCheckboxEl.checked
    );
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");

    todoNameEl.textContent = this._data.name;
    console.log(
      "Date value:",
      this._data.date,
      "Type:",
      typeof this._data.date
    );
    if (this._data.date) {
      const dueDate = new Date(this._data.date);
      if (!isNaN(dueDate)) {
        todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}`;
      }
    }
    this._generateCheckboxEl();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
