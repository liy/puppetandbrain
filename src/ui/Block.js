import Pin from "./Pin";

export default class Block
{
  constructor(model) {
    this.model = model;

    this.dom = document.createElement('div');
    this.dom.style = `margin:20px;float:left;color:white;`
    
    this.title = document.createElement('div');
    this.title.textContent = this.model.__proto__.constructor.name
    this.dom.appendChild(this.title);

    // add pin
    this.model.inputs.list.forEach(name => {
      let pin = new Pin(name);
      this.dom.appendChild(pin.dom);
    })
  }
}