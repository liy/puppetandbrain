import './TextComponent.scss'
import ElementComponent from "./ElementComponent";
import Matrix from '../math/Matrix';

export default class TextComponent extends ElementComponent
{
  constructor(text='') {
    super();

    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);

    this.textElement = document.createElement('div');
    this.textElement.className = 'text-component';
    this.textElement.textContent = text;
    this.element.appendChild(this.textElement);

    this.placeholder = 'Enter your text here...';
    this.contentEditable = true;

    this.onInput = this.onInput.bind(this);
    this.textElement.addEventListener('input', this.onInput);
  }

  onInput(e) {
    if(this.textElement.textContent == '') {
      // this removes any br, div...
      this.textElement.textContent = this.textElement.textContent;
    }
  }

  set contentEditable(v) {
    this.textElement.contentEditable = v;
  }

  get contentEditable() {
    return this.textElement.contentEditable;
  }

  set placeholder(v) {
    this.textElement.setAttribute('placeholder', v)
  }

  get placeholder() {
    return this.textElement.getAttribute('placeholder');
  }
}