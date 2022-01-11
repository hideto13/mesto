export class Section {
  constructor({ getInitialCards, renderer }, selector) {
    this.getInitialCards = getInitialCards;
    this._renderer = renderer;
    this._container = selector;
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item.name, item.link, item.likes, item._id, item.owner);
    });
  }

  addItem(element, method) {
    if (method === "append") {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }
}
