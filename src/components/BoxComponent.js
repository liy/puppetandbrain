import './BoxComponent.scss'
import ElementComponent from "./ElementComponent";

export default class BoxComponent extends ElementComponent
{
  constructor(width, height, text='test') {
    super();

    this.element.classList.add('box-component');
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;

    this.textElement = document.createElement('div');
    this.textElement.className = 'box-component-label';
    this.textElement.textContent = text;
    this.element.appendChild(this.textElement);

    this.placeholder = 'Enter your text here...';
    this.contentEditable = true;

    this.onInput = this.onInput.bind(this);
    this.textElement.addEventListener('input', this.onInput);

    this.image = document.createElement('div')
    this.image.className = 'image';
    this.image.style.backgroundImage = `url(https://cataas.com/cat?width=80)`
    this.image.style.backgroundRepeat = 'no-repeat';
    this.image.style.backgroundPosition = 'center';
    this.image.style.backgroundSize = 'contain';
    this.element.appendChild(this.image);
  }
  
  onInput(e) {
    if(this.textElement.textContent == '') {
      // this removes any br, div... so the placeholder can correctly show up
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