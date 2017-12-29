import './DataHead.scss'
import DataSymbol from './DataSymbol';

export default class DataHead
{
  constructor(flow) {
    this.element = document.createElement('div');
    this.element.className = 'data-head';

    this.symbol = new DataSymbol(flow);
    this.element.appendChild(this.symbol.element);
  }

  setInput() {

  }
}