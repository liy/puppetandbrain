import './ElementComponent.scss'
import Component from "./Component";
import Matrix from '../math/Matrix';

const stageOverlayer = document.getElementById('stage-overlayer')

export default class ElementComponent extends Component
{
  constructor(width, height) {
    super();


    this.width = width;
    this.height = height;

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

    // FIXME: not sure why this works....
    // hack to make sure it is not flickering
    // I know it is strange to have the element here.
    // but it removes flickering issue when created
    this.element.style.opacity = 0;
    stageOverlayer.appendChild(this.element);
  }

  onStage() {
    this.element.style.opacity = 1;
    this.element.addEventListener('mousedown', this.mouseDown)
    this.element.addEventListener('mouseup', this.mouseUp);
    this.element.addEventListener('mouseover', this.mouseOver)
    this.element.addEventListener('mouseout', this.mouseOut)
  }

  offStage() {
    stageOverlayer.removeChild(this.element);
    this.element.removeEventListener('mousedown', this.mouseDown)
    this.element.removeEventListener('mouseup', this.mouseUp)
    this.element.removeEventListener('mouseover', this.mouseOver)
    this.element.removeEventListener('mouseout', this.mouseOut)
  }

  mouseDown(e) {
    this.entity.mouseDown(e.clientX, e.clientY);
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
    // centre the element to its origin
    this.matrix.translate(-this.element.offsetWidth/2, -this.element.offsetHeight/2)

    this.matrix.prepend(this.entity.matrix);


    this.element.style.transform = `${this.matrix.toCss()}`;
  }

  focus() {
    this.element.focus();
  }
}