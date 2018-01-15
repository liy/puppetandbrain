import './DropDown.scss'
import Gadget from './Gadget';

export default class extends Gadget
{
  constructor(list=[]) {
    super()
    this.element.classList.add('drop-down');

    this.select = document.createElement('select');
    this.element.appendChild(this.select);

    this.select.addEventListener('mousedown', e => {
      // this is necessary as it stop re-appending block to the dom display list
      // so the drop down is correctly displayed.(If select loses focus, drop down disappears)
      // Basically it stops parent block.element listener firing.
      e.stopPropagation();
    })

    this.select.addEventListener('change', e => {
      this.emit('gadget.state.change', e.target.value);
    })

    this.setList(list);
  }

  setList(list, defaultValue) {
    this.clear();

    for(let value of list) {
      let option = document.createElement('option');
      option.value = value;
      option.textContent = value;
      this.select.appendChild(option);
    }
    this.select.value = defaultValue;
  }



  clear() {
    while(this.select.lastChild) {
      this.select.removeChild(this.select.lastChild);
    }
  }
}