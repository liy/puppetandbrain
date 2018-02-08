import './AdaptorBlock.scss'
import Block from "./Block";
import SelectorIcon from '../../assets/adaptor-selector-arrow.svg'
import { svgElement } from '../../utils/utils';
import ArrayMap from '../../utils/ArrayMap';

// has extra dropdown on title to allow swapping to similar nodes
export default class extends Block
{
  constructor() {
    super();

    this.onEntryClick = this.onEntryClick.bind(this);
    this.onExpandClick = this.onExpandClick.bind(this)

    this.element.removeChild(this.title);

    // TODO: replace this with a proper gadget?
    this.selector = document.createElement('div');
    this.selector.className = 'adaptor-selector';
    this.element.prepend(this.selector);

    this.list = document.createElement('ol');
    this.list.className = 'adaptor-list';
    this.selector.append(this.list);

    this.adaptorIcon = document.createElement('div');
    this.adaptorIcon.className = 'adaptor-icon'; 
    this.adaptorIcon.appendChild(svgElement(SelectorIcon, {width:10, height:8}));
    this.selector.appendChild(this.adaptorIcon)
    this.adaptorIcon.addEventListener('click', this.onExpandClick);

    this.selections = new ArrayMap();
  }

  addSelection(name, data) {
    this.selections.set(name, data);
    let entry = document.createElement('li');
    entry.textContent = name;
    entry.addEventListener('click', this.onEntryClick)
    this.list.appendChild(entry);
  }

  onEntryClick(e) {
    this.selector.style.maxHeight = '32px'
    this.list.prepend(e.currentTarget);
    
    // TODO: override to change node
  }

  onExpandClick(e) {
    this.selector.style.maxHeight = '500px'
  }
}