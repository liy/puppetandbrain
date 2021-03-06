import './DataPin.scss'
import InputSymbol from "./InputSymbol";
import OutputSymbol from "./OutputSymbol";
import Pin from './Pin';

export default class extends Pin
{
  constructor(name, flow) {
    super(name, flow)

    this.element.className = 'data-pin'

    // contains symbol or input gadget
    this.head = document.createElement('div');
    this.head.className = 'data-head';
    this.element.appendChild(this.head);

    if(flow == 'in') {
      this.symbol = new InputSymbol(name);
    }
    else {
      this.symbol = new OutputSymbol(name);
    }
    this.head.appendChild(this.symbol.element);
  }

  init(node) {
    super.init(node);
    this.symbol.init(node);
  }

  refreshSymbol() {
    this.symbol.refresh();
  }

  drawConnection() {
    this.symbol.drawConnection();
  }
}