import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector("form");
    this._inputs = Array.from(this._form.querySelectorAll("input, textarea"));
  }
  _getInputValues() {
    const values = {};
    this._inputs.forEach((i) => (values[i.name] = i.value.trim()));
    return values;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleSubmit(this._getInputValues(), this);
    });
  }
  close() {
    super.close();
    this._form.reset();
  }
}
