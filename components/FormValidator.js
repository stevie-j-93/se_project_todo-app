class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formEl = formEl;
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, message) {
    const errorEl = this._formEl.querySelector(`#${inputElement.id}-error`);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add(this._errorClass);
    }
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorEl = this._formEl.querySelector(`#${inputElement.id}-error`);
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.classList.remove(this._errorClass);
    }
    inputElement.classList.remove(this._inputErrorClass);
  }

  _hasInvalidInput() {
    return this._inputList.some((el) => !el.validity.valid);
  }

  _toggleButtonState() {
    const disabled = this._hasInvalidInput();
    this._buttonElement.disabled = disabled;
    this._buttonElement.classList.toggle(this._inactiveButtonClass, disabled);
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._inputList =
      this._inputList ||
      Array.from(this._formEl.querySelectorAll(this._inputSelector));
    this._buttonElement =
      this._buttonElement ||
      this._formEl.querySelector(this._submitButtonSelector);

    this._inputList.forEach((i) => this._hideInputError(i));
    this._formEl.reset();
    this._toggleButtonState();
  }
}
export default FormValidator;
