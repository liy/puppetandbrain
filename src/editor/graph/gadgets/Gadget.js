import './Gadget.scss'
import EventEmitter from '@/utils/EventEmitter'

export default class Gadget extends EventEmitter
{
  constructor() {
    super();
    this.element = document.createElement('div');
    this.element.className = 'gadget';

    // this prevents Block dragstart firing
    // The reason I don't dratstart firing is because it calls appendChild() in order
    // to bring block to the top most level.
    // But there is a side effect doing the level change using appending.
    // It cancels any click event.
    // Which means, you cannot use any click event if you are a decendent of block.body.lemtn
    // Therefore, I stop bubbling at gadget level.
    // In short, if you are clicking a input head section which has a gadget,
    // it won't start dragging the block.
    //
    // Note I did not call stopImmediatePropagation() which stop other listeners attached
    // to this.element firing.
    // I want to still allow gadget to bubble the event up, if they want to if they
    // do not include stopPropagation() in the listener.
    this.element.addEventListener('mousedown', e => {
      e.stopPropagation();
    })
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