export default class Gadget
{
  constructor(tagName) {
    this.element = document.createElement(tagName);
  }

  add(gadget) {
    this.element.appendChild(gadget.element);
  }

  remove(gadget) {
    this.element.removeChild(gadget.element);
  }
}