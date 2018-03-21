import './TextComponent.scss'
import ElementComponent from "./ElementComponent";
import Matrix from '../math/Matrix';

export default class TextComponent extends ElementComponent
{
  constructor(text='') {
    super();
    
    this.textElement = document.createElement('div');
    this.textElement.className = 'text-component';
    this.textElement.textContent = text;
    this.element.appendChild(this.textElement);

    this.placeholder = 'Enter your text here...';
    this.contentEditable = true;

    this.onInput = this.onInput.bind(this);
    this.textElement.addEventListener('input', this.onInput);

    this.inputMode = false;
    
    // TODO: Should I allow text drag select???
    this.textElement.addEventListener('mousedown', e => {
      if(this.inputMode) {
        e.stopPropagation();
      }
    })

    this.textElement.addEventListener('mouseup', e => {
      this.inputMode = true;
      this.textElement.focus();
    })

    this.textElement.addEventListener('blur', e => {
      this.inputMode = false;
    })
  }

  onInput(e) {
    this.emit('input', this.textElement.textContent);
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
  
  set text(text) {
    this.textElement.textContent = text || '';
  }

  get text() {
    return this.textElement.textContent;
  }

  set textColor(c) {
    this._textColor = c;
    this.textElement.style.color = `#${c.toString(16)}`
  }

  get textColor() {
    return this._textColor;
  }

  set font(f) {
    this.textElement.style.font = f;
  }

  get font() {
    return this.textElement.style.font;
  }

  set fontSize(size) {
    this.textElement.style.fontSize = `${size}px`;
  }

  get fontSize() {
    return parseInt(this.textElement.style.fontSize.replace('px'));
  }
}