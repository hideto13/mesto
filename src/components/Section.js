export class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = selector;
  }

  renderItems() {
    this._items
      .then((items) => {
        items.forEach((item) => {
          this._renderer(
            item.name,
            item.link,
            item.likes,
            item._id,
            item.owner
          );
        });
      })
      .catch((err) => console.log(err));
  }

  addItem(element, method) {
    if (method === "append") {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }
}
