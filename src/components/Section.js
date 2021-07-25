export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItem(item, personalId) {
        this._renderer(item, personalId);
    }

    addItem(item) {
        this._container.prepend(item);
    }
}