import './AddOutputPin.scss';
import InputField from '../gadgets/InputField';
import PlusIcon from '../../assets/plus.svg';
import {svgElement} from '../../utils/utils'

export default class
{
  constructor(node) {
    this.element = document.createElement('div');
    this.element.className = 'add-output-pin-container'

    this.pin = document.createElement('div');
    this.pin.className = 'add-output-pin';
    this.element.appendChild(this.pin)

    this.inputField = new InputField();
    this.pin.appendChild(this.inputField.element);

    this.head = document.createElement('div');
    this.head.className = 'add-output-head';
    this.pin.appendChild(this.head);

    let svg = svgElement(PlusIcon, {className: 'plus-svg', width:13, height:13})
    this.head.appendChild(svg);

    this.head.addEventListener('mousedown', e => {
      e.preventDefault();
      
      let outputName = String.trim(this.inputField.value);
      if(outputName) {
        node.outputs.addOutput(outputName);
        this.inputField.value = '';
      }
    })
  }
}