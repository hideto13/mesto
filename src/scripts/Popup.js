export class Popup {
  constructor(selector) {
    this._popup = selector;
    this._closeButton = this._popup.querySelector('.popup__close')
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClose(event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", this.close.bind(this));
    this._popup.addEventListener("click", this._handleOverlayClose.bind(this));
  }

  open() {
    this._popup.classList.add("popup_opened");
    this.setEventListeners();
    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
}
