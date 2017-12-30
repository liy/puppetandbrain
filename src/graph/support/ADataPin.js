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

    this.symbol = new DataSymbol(flow);
    this.head.appendChild(this.symbol.element);
  }

  setGadget(gadget) {
    this.gadget = gadget;
    this.head.appendChild(this.gadget.element);
  }

  set gadgetVisible(flag) {
    this.symbol.visible = !flag;
    this.gadget.visible = flag;
  }
}