import './BoxComponent.scss'
import ElementComponent from "./ElementComponent";

export default class BoxComponent extends ElementComponent
{
  constructor(width, height, text='test') {
    super(width, height);

    this.element.classList.add('box-component');
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;

    this.imageContainer = document.createElement('div')
    this.imageContainer.className = 'image';
    this.element.appendChild(this.imageContainer);
    this.image = new Image();
    this.image.crossOrigin = 'Anonymous'
    this.image.draggable = false;
    this.imageContainer.appendChild(this.image);

    this.textElement = document.createElement('div');
    this.textElement.className = 'label';
    this.textElement.textContent = text;
    this.element.appendChild(this.textElement);

    this.placeholder = 'Enter your text here...';
    this.contentEditable = true;

    this.onInput = this.onInput.bind(this);
    this.textElement.addEventListener('input', this.onInput);

    this.textColor = 0x000000;

    // TODO: Should I allow text drag select???
    this.textElement.addEventListener('mousedown', e => {
      e.stopPropagation();
    })
  }
  
  onInput(e) {
    if(this.textElement.textContent == '') {
      // this removes any br, div... so the placeholder can correctly show up
      this.textElement.textContent = this.textElement.textContent;
    }
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

  set textColor(c) {
    this._textColor = c;
    this.textElement.style.color = `#${c.toString(16)}`
  }

  get textColor() {
    return this._textColor;
  }

  set imageUrl(url) {
    this._imageUrl = url;
    // this.image.style.backgroundImage = `url(${url})`
    this.image.src = url;
  }

  get imageUrl() {
    return this._imageUrl;
  }

  set text(text) {
    this.textElement.textContent = text || '';
  }

  get text() {
    return this.textElement.textContent;
  }

  set fontSize(size) {
    this.textElement.style.fontSize = `${size}px`;
  }

  get fontSize() {
    return parseInt(this.textElement.style.fontSize.replace('px'));
  }
}