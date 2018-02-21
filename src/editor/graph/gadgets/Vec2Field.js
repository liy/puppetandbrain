import './Vec2Field.scss';
import InputField from "./InputField";
import Gadget from './Gadget';
import { numericVector } from '@/utils/utils';

export default class extends Gadget
{
  constructor(vec2={x:1,y:1}) {
    super();
    vec2 = numericVector(vec2);
    
    this.element.classList.add('vec2-field');

    this.xSpan = document.createElement('span');
    this.xSpan.className = 'x-span';
    this.xSpan.textContent = 'x'
    this.element.appendChild(this.xSpan);

    this.xInputField = new InputField(vec2.x, 'number')
    this.element.appendChild(this.xInputField.element);

    this.ySpan = document.createElement('span');
    this.ySpan.className = 'y-span';
    this.ySpan.textContent = 'y'
    this.element.appendChild(this.ySpan);

    this.yInputField = new InputField(vec2.y, 'number');
    this.element.appendChild(this.yInputField.element);
    this.vec2 = vec2; 

    this.xInputField.on('gadget.state.change', x => {
      this.vec2.x = Number(x);
      this.emit('gadget.state.change', this.vec2)
    })

    this.yInputField.on('gadget.state.change', y => {
      this.vec2.y = Number(y);
      this.emit('gadget.state.change', this.vec2)
    })

    this.xInputField.input.addEventListener('click', e => {
      e.target.select();
    })
    this.yInputField.input.addEventListener('click', e => {
      e.target.select();
    })
  }

  destroy() {
    this.xInputField.destroy();
    this.yInputField.destroy();
    super.destroy();
  }

  get value() {
    return this.vec2
  }

  set value(vec2) {
    this.vec2 = {
      x: vec2.x,
      y: vec2.y
    }
    this.xInputField.value = vec2.x;
    this.yInputField.value = vec2.y;
  }
}