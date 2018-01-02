import './ADataPin.scss'
import DataSymbol from "../gadgets/DataSymbol";
import APin from './APin';

export default class ADataPin extends APin
{
  constructor(name, flow) {
    super(name, flow)

    // contains symbol or input gadget
    this.head = document.createElement('div');
    this.head.className = 'data-head';
    this.element.appendChild(this.head);
  }

  init(node) {
    this.node = node;
  }
}