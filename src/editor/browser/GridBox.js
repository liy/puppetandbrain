import './GridBox.scss';
import EventEmitter from "../utils/EventEmitter";

export default class extends EventEmitter
{
  constructor() {
    super();

    this.element = document.createElement('div');
    this.element.className = 'grid-box';
  }

  isInViewport() {
    var rect = this.element.getBoundingClientRect();

    return (rect.top >= 0) && (rect.left >= 0) &&
        (rect.bottom <= window.innerHeight) && (rect.right <= window.innerWidth) 
  }
}