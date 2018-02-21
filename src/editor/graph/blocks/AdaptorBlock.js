import './AdaptorBlock.scss'
import Block from "./Block";
import SelectorIcon from '@/assets/adaptor-selector-arrow.svg'
import TickIcon from '@/assets/adaptor-selector-tick.svg'
import { svgElement, everyframe } from '@/utils/utils';
import ArrayMap from '@/utils/ArrayMap';

// has extra dropdown on title to allow swapping to similar nodes
export default class AdaptorBlock extends Block
{
  constructor() {
    super();

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
  }

  init(node) {
    super.init(node);
    
    this.onTransitionEnd = this.onTransitionEnd.bind(this)
    this.onSelection = this.onSelection.bind(this);
    this.toggle = this.toggle.bind(this)

    this.headerName.textContent = this.node.operation.name;

    let operations = NodeTemplate[node.className].operations;
    for(let operation of operations) {
      this.addSelection(operation)
    }

    this.selector.addEventListener('transitionend', this.onTransitionEnd)
    this.selector.addEventListener('webkitTransitionEnd', this.onTransitionEnd)
    this.selector.addEventListener('msTransitionEnd', this.onTransitionEnd)

    this.header.addEventListener('click', this.toggle);
  }

  destroy() {
    super.destroy();
    this.selector.removeEventListener('transitionend', this.onTransitionEnd)
    this.selector.removeEventListener('webkitTransitionEnd', this.onTransitionEnd)
    this.selector.removeEventListener('msTransitionEnd', this.onTransitionEnd)
    this.header.removeEventListener('click', this.toggle);
  }

  addSelection(operation) {
    let item = document.createElement('li');
    this.list.appendChild(item);
    item.operation = operation;
    
    let itemName = document.createElement('span');
    itemName.textContent = operation.description;
    item.appendChild(itemName)
    
    let icon = document.createElement('div');
    icon.className = 'adaptor-selector-icon';
    icon.appendChild(svgElement(TickIcon, {width:11, height:8}));
    item.appendChild(icon);

    if(operation.operationName == this.node.operationName) {
      this.selectedItem = item;
      this.selectedItem.classList.add('selected');
    }

    item.addEventListener('click', this.onSelection)
  }

  onSelection(e) {
    this.selector.style.maxHeight = '32px'

    this.selectedItem.classList.remove('selected');
    this.selectedItem = e.currentTarget;
    e.currentTarget.classList.add('selected');

    this.headerName.textContent = this.selectedItem.operation.name;

    this.toggle();
    
    this.node.operationName = this.selectedItem.operation.operationName;
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
    this.headerName.textContent = pod.operations[0].description;
  }
}