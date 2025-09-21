export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._handleEscapeClose = this._handleEscapeClose.bind(this);
  }
  open() {
    this._popup.classList.add("popup_visible");
    document.addEventListener("keydown", this._handleEscapeClose);
  }
  close() {
    this._popup.classList.remove("popup_visible");
    document.removeEventListener("keydown", this._handleEscapeClose);
  }
  _handleEscapeClose(e) {
    if (e.key === "Escape") this.close();
  }
  setEventListeners() {
    const closeBtn = this._popup.querySelector(".popup__close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.close());
    }

    this._popup.addEventListener("mousedown", (e) => {
      const overlay = e.target.classList.contains("popup_visible");
      const closeBtn = e.target.classList.contains("popup_close");
      if (overlay || closeBtn) this.close();
    });
  }
}
