import './Gadget.scss'
import EventEmitter from '../../utils/EventEmitter'

export default class Gadget extends EventEmitter
{
  constructor() {
    super();
    this.element = document.createElement('div');
    this.element.className = 'gadget';
  }

  /**
   * Destroy gadget and remove all listeners
   * 
   * @memberof Gadget
   */
  destroy() {
    this.removeAllListeners();
  }
  
  get visible() {
    return this._visible;
  }

  set visible(v) {
    this._visible = v;
    if(v) {
      this.element.style.display = 'inherit';
    }
    else {
      this.element.style.display = 'none';
    }
  }
}