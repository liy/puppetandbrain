import './ImageField.scss'
import Gadget from './Gadget'
import InputField from './InputField'

// TODO fin
export default class extends Gadget
{
  constructor(value) {
    super();

    this.element.classList.add('image-field');

    this.input = new InputField(value, 'Drop here...');
    this.element.appendChild(this.input.element);

    this.image = document.createElement('img');
    this.image.src = value;
    this.element.appendChild(this.image);

    this.onDrop = this.onDrop.bind(this);
    this.element.addEventListener('drop', this.onDrop);

    this.url = this.value;

    this.element.addEventListener('dragover', e => {
      e.preventDefault();

      this.value = ''
      this.element.classList.add('drag-over');
    })
    this.element.addEventListener('dragend', e => {
      e.preventDefault();

      this.value = this.url;
      this.element.classList.remove('drag-over');
    })
    this.element.addEventListener('dragleave', e => {
      e.preventDefault();

      this.value = this.url
      this.element.classList.remove('drag-over');
    });
  }

  onDrop(e) {
    e.preventDefault();

    this.element.classList.remove('drag-over');
    
    let html = e.dataTransfer.getData('text/html');
    let doc = new DOMParser().parseFromString(html, "image/svg+xml");
    let imageUrl = doc.querySelector('img').getAttribute('src')
    
    this.url = this.value = imageUrl;

    this.image.src = this.url;
    
    this.emit('gadget.state.change', this.value)
  }

  set value(v) {
    this.input.value = v;
  }

  get value() {
    return this.input.value
  }
}