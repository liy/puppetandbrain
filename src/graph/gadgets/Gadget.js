export default class Gadget
{
  constructor() {
    this.element = document.createElement('div')
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