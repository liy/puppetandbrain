import Pin from "./Pin";

export default class Block
{
  constructor(model) {
    this.model = model;

    this.minWidth = 200;
    this.minHeight = 60;
 
    this.dom = document.createElement('div');
    this.dom.style = `min-height:${this.minHeight}px; min-width:${this.minWidth}px; padding-bottom:5px; background:rgba(242, 245,251, 1); position:absolute; border-radius:10px; font-family: "Roboto Condensed", "Helvetica Neue", Helvetica, Arial, sans-serif;`;
    
    this.title = document.createElement('div');
    this.title.style = 'user-select:none;cursor:default;background:#c0c4ce; border-radius:10px 10px 0 0; padding:5px 10px;'
    this.title.textContent = this.model.__proto__.constructor.name + " " + (model.name ? model.name : '')
    this.dom.appendChild(this.title);

    if(this.model.execution) {
      this.execSection = document.createElement('div')
      this.execSection.style = `height:20px`;
      this.dom.appendChild(this.execSection)
    }

    this.varSection = document.createElement('div')
    this.varSection.style = 'margin-left:5px; margin-right:5px; margin-top:5px;'
    this.dom.appendChild(this.varSection);

    // add pin
    if(this.model.inputs) {
      this.model.inputs.list.forEach(name => {
        let pin = new Pin(name);
        this.varSection.appendChild(pin.dom);
      })
    }

    if(this.model.outputs) {
      this.model.outputs.list.forEach(name => {
        let pin = new Pin(name, 'right');
        this.varSection.appendChild(pin.dom);
      })
    }
    

    if(this.model.value) {
      let pin = new Pin('value', 'right');
      this.varSection.appendChild(pin.dom);
    }

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