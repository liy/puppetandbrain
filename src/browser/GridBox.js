import './GridBox.scss';
import EventEmitter from "../utils/EventEmitter";

export default class extends EventEmitter
{
  constructor() {
    super();

    this.element = document.createElement('div');
    this.element.className = 'grid-box';
  }
}