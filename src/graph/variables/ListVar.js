import './ListVar.scss';
import VariableBase from './VariableBase';
import ListEntry from './ListEntry';
import ListIcon from '../../assets/list-icon.svg';
import AddIcon from '../../assets/plus.svg'
import { svgElement, nextFrame } from '../../utils/utils';

export default class extends VariableBase
{
  constructor() {
    super();

    this.entries = new Array();

    this.name.placeholder = 'list name...'
    this.icon.appendChild(svgElement(ListIcon, {width:17, height:14}));

    // only show up when selected
    this.addButton = document.createElement('div');
    this.addButton.appendChild(svgElement(AddIcon, {width:12, height:12}))
    this.container.appendChild(this.addButton);
    this.addButton.className = 'add-variable-icon';

    this.listElement = document.createElement('ol');
    this.listElement.className = 'list'
    this.element.appendChild(this.listElement);

    this.add = this.add.bind(this);
    this.expand = this.expand.bind(this);

    this.addButton.addEventListener('mousedown', this.add);
  }

  add() {
    let entry = new ListEntry(this.entries.length, '');
    this.entries.push(entry)
    this.listElement.appendChild(entry.element);

    // wait until next frame to focus
    nextFrame().then(() => {
      entry.focus();
    })
  }

  get(index) {
    return this.entries[index];
  }
}