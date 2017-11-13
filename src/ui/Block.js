import Pin from "./Pin";

export default class Block
{
  constructor(model) {
    this.model = model;

    this.minWidth = 200;

    this.dom = document.createElement('div');
    this.dom.style = `min-width:${this.minWidth}px; background:rgba(242, 245, 251,1); position:absolute;padding:10px; border-radius:10px; font-family: "Roboto Condensed", "Helvetica Neue", Helvetica, Arial, sans-serif;`;

    // this.background = document.createElement('div');
    // this.dom.style = `width:auto;background:white;padding:10px`
    // this.dom.appendChild(this.background)
    
    this.title = document.createElement('div');
    this.title.style = 'user-select:none;cursor:default'
    this.title.textContent = this.model.__proto__.constructor.name + " " + (model.name ? model.name : '')
    this.dom.appendChild(this.title);

    // add pin
    this.model.inputs.list.forEach(name => {
      let pin = new Pin(name);
      this.dom.appendChild(pin.dom);
    })

    this.dragstart = this.dragstart.bind(this);
    this.dragstop = this.dragstop.bind(this);
    this.dragmove = this.dragmove.bind(this);

    this.dom.addEventListener('mousedown', this.dragstart);
    this.dom.addEventListener('mouseup', this.dragstop);
  }

  dragstart(e) {
    e.stopPropagation();
  
    this.offset = {
      x: this.dom.offsetLeft - e.clientX,
      y: this.dom.offsetTop - e.clientY
    }
    document.addEventListener('mousemove', this.dragmove)
  }

  dragstop(e) {
    document.removeEventListener('mousemove', this.dragmove)
  }

  dragmove(e) {
    // console.log(e.clientX, e.clientY, this.dom.offsetTop, this.dom.offsetLeft)
    // this.dom.style.top = e.clientY - (e.clientY - this.dom.offsetTop) + 'px';
    // this.dom.style.left = e.clientX - (e.clientX - this.dom.offsetLeft) + "px";
    this.dom.style.top = e.clientY + this.offset.y + 'px';
    this.dom.style.left = e.clientX  + this.offset.x + "px";
  }

  set x(v) {
    this.dom.style.left = v +'px'
  }

  set y(v) {
    this.dom.style.top = v +'px'
  }

  get width() {
    return this.minWidth
  }

  get height() {
    return this.dom.getClientRects().height;
  }
}