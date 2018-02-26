import './PositionField.scss';
import InputField from "./InputField";
import Vec2Field from './Vec2Field';

import PipetteIcon from '@/assets/pipette.svg'; 
import {svgElement} from '@/utils/utils';

export default class extends Vec2Field
{
  constructor(vec2={x:0,y:0}) {
    super(vec2);
    this.element.classList.add('position-field');

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
          x: e.clientX - ActivityManager.current.stage.offsetX,
          y: e.clientY - ActivityManager.current.stage.offsetY
        }
        this.emit('gadget.state.change', this.value);

        document.body.style.cursor = 'auto';
        document.removeEventListener('mousedown', picked);
        document.removeEventListener('mousemove', picking);
      }

      let picking = e => {
        this.value = {
          x: e.clientX - ActivityManager.current.stage.offsetX,
          y: e.clientY - ActivityManager.current.stage.offsetY
        }
        this.emit('gadget.state.change', this.value);
      }
      
      document.addEventListener('mousedown', picked);
      document.addEventListener('mousemove', picking);
    })
  }
}