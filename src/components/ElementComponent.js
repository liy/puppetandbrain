import './TextComponent.scss'
import Component from "./Component";
import Matrix from '../math/Matrix';

export default class ElementComponent extends Component
{
  constructor() {
    super();

    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);

    this.element = document.createElement('div');
    this.element.className = 'element-component';

    // local transform
    this.position = {
      x: 0,
      y: 0
    }
    this.scale = {
      x: 1,
      y: 1
    }
    this.rotation = 0;

    this.matrix = new Matrix();
  }

  added() {
    document.getElementById('stage-overlayer').appendChild(this.element);
    this.element.addEventListener('mousedown', this.mouseDown)
    this.element.addEventListener('mouseup', this.mouseUp)
  }

  removed() {
    document.getElementById('stage-overlayer').removeChild(this.element);
    this.element.removeEventListener('mousedown', this.mouseDown)
    this.element.removeEventListener('mouseup', this.mouseUp)
  }

  mouseDown(e) {
    let rect = this.element.getBoundingClientRect();
    // FXIME: calculate the offset correctly
    let offset = {
      x: rect.left - e.clientX - this.position.x,
      y: rect.top - e.clientY - this.position.y
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
    this.matrix.identity();
    
    this.matrix.rotate(this.rotation);
    this.matrix.scale(this.scale.x, this.scale.y);
    this.matrix.translate(this.position.x, this.position.y);

    this.matrix.prepend(this.entity.matrix);

    // No idea why css set transform origin to 0.5 by default
    this.element.style.transformOrigin = '0 0';
    this.element.style.transform = this.matrix.toCss();
  }

  focus() {
    this.element.focus();
  }
}