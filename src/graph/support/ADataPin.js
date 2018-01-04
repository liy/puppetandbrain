import './ADataPin.scss'
import InputSymbol from "../gadgets/InputSymbol";
import OutputSymbol from "../gadgets/OutputSymbol";
import APin from './APin';

export default class ADataPin extends APin
{
  constructor(name, flow) {
    super(name, flow)

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