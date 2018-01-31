import './ListElement.scss';
import VariableElement from './VariableElement';
import ListEntry from './ListEntry';
import ListIcon from '../../assets/list-icon.svg';
import AddIcon from '../../assets/plus.svg'
import { svgElement, nextFrame } from '../../utils/utils';
import DataType from '../../data/DataType';

export default class extends VariableElement
{
  constructor(variable) {
    super(variable);
    this.type = DataType.ARRAY;

    // store the list entry element
    this.entries = [];

    // only show up when selected
    this.addButton = document.createElement('div');
    this.addButton.appendChild(svgElement(AddIcon, {width:12, height:12}))
    this.content.appendChild(this.addButton);
    this.addButton.className = 'add-entry-icon';
    this.addButton.style.visibility = 'hidden';

    this.listElement = document.createElement('ol');
    this.listElement.setAttribute('placeholder', 'Empty... 😭') 
    this.listElement.className = 'list'
    this.element.appendChild(this.listElement);

    this.addButton.addEventListener('mousedown', e => {
      e.preventDefault();
      this.add();
    });

    // initialize the list
    for(let i=0; i<this.variable.data.length; ++i) {
      let value = this.variable.data[i];
      let entry = new ListEntry(this.variable.data, i, value);
      this.listElement.appendChild(entry.element);
      this.entries.push(entry);
      entry.on('entry.remove', this.remove, this)
    }
  }

  destroy() {
    for(let entry of this.entries) {
      entry.off('entry.remove', this.remove, this)
      this.listElement.removeChild(entry.element);
    }
  }

  add(value=null) {
    let entry = new ListEntry(this.variable.data, this.variable.data.length, value);
    this.listElement.appendChild(entry.element);

    this.variable.data.push(value)
    this.entries.push(entry);

    // wait until next frame to focus
    nextFrame().then(() => {
      entry.focus();
    })

    entry.on('entry.remove', this.remove, this)
  }

  remove(entry) {
    this.variable.data.splice(entry.index, 1);
    this.entries.splice(entry.index, 1);
    this.listElement.removeChild(entry.element);

    // refresh the element index text
    for(let i=0; i<this.entries.length; ++i) {
      this.entries[i].index = i
    }
  }

  get(index) {
    return this.entries[index];
  }

  select() {
    super.select();
    this.listElement.style.display = 'block';
    this.addButton.style.visibility = 'visible';
  }

  deselect() {
    super.deselect();
    this.listElement.style.display = 'none';
    this.addButton.style.visibility = 'hidden';
  }

  createIcon() {
    return svgElement(ListIcon, {width:17, height:14})
  }
}