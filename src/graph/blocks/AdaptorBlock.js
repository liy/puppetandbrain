import './AdaptorBlock.scss'
import Block from "./Block";
import SelectorIcon from '../../assets/adaptor-selector-arrow.svg'
import TickIcon from '../../assets/adaptor-selector-tick.svg'
import { svgElement, everyframe } from '../../utils/utils';
import ArrayMap from '../../utils/ArrayMap';

// has extra dropdown on title to allow swapping to similar nodes
export default class extends Block
{
  constructor() {
    super();

    this.onTransitionEnd = this.onTransitionEnd.bind(this)
    this.onSelection = this.onSelection.bind(this);
    this.toggle = this.toggle.bind(this)

    this.element.removeChild(this.title);

    // TODO: replace this with a proper gadget?
    this.selector = document.createElement('div');
    this.selector.className = 'adaptor-selector';
    this.element.prepend(this.selector);

    this.header = document.createElement('div');
    this.header.className = 'adaptor-selector-header'
    this.selector.appendChild(this.header);
    
    this.headerName = document.createElement('div');
    this.headerName.className = 'header-name'
    this.header.appendChild(this.headerName);

    let icon = document.createElement('div');
    icon.className = 'adaptor-selector-icon';
    icon.appendChild(svgElement(SelectorIcon, {width:10, height:8}));
    this.header.appendChild(icon);

    this.list = document.createElement('ol');
    this.selector.append(this.list);

    this.header.addEventListener('click', this.toggle);

    
    this.selector.addEventListener('transitionend', this.onTransitionEnd)
    this.selector.addEventListener('webkitTransitionEnd', this.onTransitionEnd)
    this.selector.addEventListener('msTransitionEnd', this.onTransitionEnd)
  }

  init(node) {
    super.init(node);

    this.headerName.textContent = this.node.name;
  }

  addSelection(name, data) {
    let item = document.createElement('li');
    this.list.appendChild(item);
    item.name = name;
    
    let itemName = document.createElement('span');
    itemName.textContent = name;
    item.appendChild(itemName)
    
    let icon = document.createElement('div');
    icon.className = 'adaptor-selector-icon';
    icon.appendChild(svgElement(TickIcon, {width:11, height:8}));
    item.appendChild(icon);

    if(name == this.headerName.textContent) {
      this.selectedItem = item;
      this.selectedItem.classList.add('selected');
      console.log(this.selectedItem)
    }

    item.addEventListener('click', this.onSelection)
  }

  onSelection(e) {
    this.selector.style.maxHeight = '32px'

    this.selectedItem.classList.remove('selected');
    this.selectedItem = e.currentTarget;
    e.currentTarget.classList.add('selected');

    this.headerName.textContent = this.selectedItem.textContent;

    this.toggle();
    
    // TODO: override to change node
  }

  toggle() {
    this.expanded = !this.expanded
    if(this.expanded) {
      this.selector.style.maxHeight = '500px'
    } 
    else {
      this.selector.style.maxHeight = '32px'
    }

    if(this.animationHandler) this.animationHandler.cancel();
    this.animationHandler = everyframe(() => {
      this.drawConnection();
    })
  }

  onTransitionEnd(e) {
    // stop calling drawConnection
    this.animationHandler.cancel();
  }

  template(pod) {
    super.template(pod);
    this.headerName.textContent = pod.name;
  }
}