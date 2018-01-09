import './ListElement.scss';
import VariableElement from './VariableElement';
import ListEntry from './ListEntry';
import ListIcon from '../../assets/list-icon.svg';
import AddIcon from '../../assets/plus.svg'
import { svgElement, nextFrame } from '../../utils/utils';
import DataType from '../../data/DataType';

export default class extends VariableElement
{
  constructor(data=[]) {
    super(data);
    this.type = DataType.ARRAY;

    // store the list entry element
    this.entries = [];

    this.name.placeholder = 'list name...'
    this.icon.appendChild(svgElement(ListIcon, {width:17, height:14}));

    // only show up when selected
    this.addButton = document.createElement('div');
    this.addButton.appendChild(svgElement(AddIcon, {width:12, height:12}))
    this.container.appendChild(this.addButton);
    this.addButton.className = 'add-entry-icon';
    this.addButton.style.visibility = 'hidden';

    this.listElement = document.createElement('ol');
    this.listElement.setAttribute('placeholder', 'Empty... 😭') 
    this.listElement.className = 'list'
    this.element.appendChild(this.listElement);

    this.remove = this.remove.bind(this);

    this.addButton.addEventListener('mousedown', e => {
      e.preventDefault();
      this.add();
    });

    // initialize the list
    for(let value of this.data) {
      this.add(value);
    }
  }

  destroy() {
    for(let entry of this.entries) {
      entry.off('entry.remove', this.remove)
      this.listElement.removeChild(entry.element);
    }
  }

  add(value='') {
    let entry = new ListEntry(this.data, this.data.length, value);
    this.listElement.appendChild(entry.element);

    this.data.push(value)
    this.entries.push(entry);

    // wait until next frame to focus
    nextFrame().then(() => {
      entry.focus();
    })

    entry.on('entry.remove', this.remove)
  }

  remove(entry) {
    this.data.splice(entry.index, 1);
    this.entries.splice(entry.index, 1);
    this.listElement.removeChild(entry.element);

    if(this.data.length == 0) {
      this.shrink();
    }
    else {
      // refresh the element index text
      for(let i=0; i<this.entries.length; ++i) {
        this.entries[i].index = i
      }
    }
  }

  get(index) {
    return this.entries[index];
  }

  expand() {
    // if(this.data.length > 0) {
      super.expand();
      this.listElement.style.display = 'block';
      this.addButton.style.visibility = 'visible';
    // }
  }

  shrink() {
    super.shrink();
    this.listElement.style.display = 'none';
    this.addButton.style.visibility = 'hidden';
  }
}