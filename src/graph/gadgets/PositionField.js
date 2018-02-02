import './PositionField.scss';
import InputField from "./InputField";
import Gadget from './Gadget';

import PipetteIcon from '../../assets/pipette.svg'; 
import {svgElement} from '../../utils/utils';

export default class extends Gadget
{
  constructor(position={x:0,y:0}) {
    super();
    this.element.classList.add('position-field');

    this.xSpan = document.createElement('span');
    this.xSpan.className = 'x-span';
    this.xSpan.textContent = 'x'
    this.element.appendChild(this.xSpan);

    this.xInputField = new InputField(position.x)
    this.xInputField.input.type = 'number'
    this.xInputField.input.step = 0.01
    this.element.appendChild(this.xInputField.element);

    this.ySpan = document.createElement('span');
    this.ySpan.className = 'y-span';
    this.ySpan.textContent = 'y'
    this.element.appendChild(this.ySpan);

    this.yInputField = new InputField(position.y);
    this.yInputField.input.type = 'number'
    this.yInputField.input.step = 0.01
    this.element.appendChild(this.yInputField.element);
    this._position = position; 

    // picker
    this.picker = document.createElement('div');
    this.picker.className = 'gadget-icon';
    this.picker.appendChild(svgElement(PipetteIcon,{width:16, height:16}));
    this.element.appendChild(this.picker);

    // those are self contained, and does not require remvoing event 
    this.picker.addEventListener('mousedown', e => {
      e.stopPropagation();

      document.body.style.cursor = 'crosshair';
      let picked = e => {
        this.value = {
          x: e.clientX - Editor.stage.offsetX,
          y: e.clientY - Editor.stage.offsetY
        }
        this.emit('gadget.state.change', this.value);

        document.body.style.cursor = 'auto';
        document.removeEventListener('mousedown', picked);
        document.removeEventListener('mousemove', picking);
      }

      let picking = e => {
        this.value = {
          x: e.clientX - Editor.stage.offsetX,
          y: e.clientY - Editor.stage.offsetY
        }
        this.emit('gadget.state.change', this.value);
      }
      
      document.addEventListener('mousedown', picked);
      document.addEventListener('mousemove', picking);
    })

    this.xInputField.on('gadget.state.change', x => {
      this._position.x = Number(x);
      this.value = this._position;
      this.emit('gadget.state.change', this._position)
    })

    this.yInputField.on('gadget.state.change', y => {
      this._position.y = Number(y);
      this.value = this._position
      this.emit('gadget.state.change', this._position)
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
    return this._position
  }

  set value(position) {
    this._position = {
      x: position.x,
      y: position.y
    }
    this.xInputField.value = position.x;
    this.yInputField.value = position.y;
  }
}