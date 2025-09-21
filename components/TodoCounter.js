export default class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    if (!this._element)
      throw new Error(`TodoCounter: no element matches "${selector}"`);

    const list = Array.isArray(todos) ? todos : [];
    this._total = list.length;
    this._completed = list.filter((t) => !!t.completed).length;

    this._updateText();
  }

  updateCompleted = (checked) => {
    this._completed += checked ? 1 : -1;
    if (this._completed < 0) this._completed = 0;
    if (this._completed > this._total) this._completed = this._total;
    this._updateText();
  };

  updateTotal = (increment) => {
    this._total += increment ? 1 : -1;
    if (this._total < 0) this._total = 0;
    if (this._completed > this._total) this._completed = this._total;
    this._updateText();
  };

  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}
