import EventEmitter from '../../utils/EventEmitter'

export default class Gadget extends EventEmitter
{
  constructor() {
    super();
    this.element = document.createElement('div');
  }

  destroy() {
    this.clear();
  }
  
  get visible() {
    return this._visible;
  }

  set visible(v) {
    this._visible = v;
    if(v) {
      this.element.style.display = 'block';
    }
    else {
      this.element.style.display = 'none';
    }
  }
}