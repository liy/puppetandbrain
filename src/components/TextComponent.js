import './TextComponent.scss'
import Component from "./Component";

export default class TextComponent extends Component
{
  constructor(text='') {
    super();

    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);

    this.element = document.createElement('div');
    this.element.className = 'text-component';
    this.element.textContent = text;

    // local translate
    this.x = 0;
    this.y = 0;

    this.placeholder = 'Enter your text here...';
    this.contentEditable = true;
  }

  destroy() {
    document.getElementById('dom-stage').removeChild(this.element);
    this.element.removeEventListener('mousedown', this.mouseDown)
    this.element.removeEventListener('mouseup', this.mouseUp)
  }

  set contentEditable(v) {
    this.element.contentEditable = v;
  }

  get contentEditable() {
    return this.element.contentEditable;
  }

  set placeholder(v) {
    this.element.setAttribute('placeholder', v)
  }

  get placeholder() {
    return this.element.getAttribute('placeholder');
  }

  added() {
    document.getElementById('dom-stage').appendChild(this.element);

    this.element.addEventListener('mousedown', this.mouseDown)
    this.element.addEventListener('mouseup', this.mouseUp)
  }

  mouseDown(e) {
    let rect = this.element.getBoundingClientRect();
    let offset = {
      x: rect.left - e.clientX,
      y: rect.top - e.clientY
    }
    this.entity.mouseDown(e.clientX, e.clientY, offset);
  }

  mouseUp(e) {
    this.entity.mouseUp(e);
  }

  mouseOver(e) {
    this.entity.mouseOver(e);
  }

  mouseOut(e) {
    this.entity.mouseOut(e);
  }

  updateTransform() {
    this.element.style.transform = `translate(${this.x+this.entity.translate.x}px, ${this.y+this.entity.translate.y}px)`
  }

  focus() {
    this.element.focus();
  }
}