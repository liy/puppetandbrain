import OutputPin from "./OutputPin";
import Block from "./Block";
import InputPin from "./InputPin";

export default class ArithmeticBlock extends Block
{
  constructor(model) {
    super(model);

    let minWidth = 200;
    let minHeight = 40;
    this.container.style = `min-height:${minHeight}px; min-width:${minWidth}px; padding-bottom:5px; background:rgba(242, 245,251, 0.7); position:absolute; border-radius:5px; font-family: "Roboto Condensed", "Helvetica Neue", Helvetica, Arial, sans-serif;`;    
    
    this.inPin = null;
    this.outPins = Object.create(null);
  
    this.title = document.createElement('div');
    this.title.style = 'user-select:none; cursor:default; background:rgba(192, 196, 206, 0.85); border-radius:5px 5px 0 0; padding:5px 10px;'
    this.container.appendChild(this.title);
    let title = this.model.__proto__.constructor.name;
    if(title == 'Call') {
      title += ' Function ' + this.model.variables.functionName
    }
    else if(title == 'Function') {
      title += ' ' + this.model.variables.functionName;
    }
    this.title.textContent = title;

    this.content = document.createElement('div');
    this.container.appendChild(this.content);

    let rows = [];
    let row = (i) => {
      if(!rows[i]) {
        rows[i] = document.createElement('div');
        rows[i].setAttribute('class', 'row')
        this.content.appendChild(rows[i]);
      }
      return rows[i]
    }

    for(let i=0; i<this.model.inputs.list.length; ++i) {
      let name = this.model.inputs.list[i];
      let pin = new InputPin(this.model.inputs.get(name))
      row(i).appendChild(pin.container);
      this.inputPins[name] = pin;
    }

    let pin = new OutputPin('value');
    row(0).appendChild(pin.container);
    this.outputPins['value'] = pin
  }

  dragmove(e) {
    super.dragmove(e);

    // update draw input and output pins
    Object.keys(this.inputPins).forEach(name => {
      let pin = this.inputPins[name]
      pin.drawConnection();
    })
    
    Object.keys(this.outputPins).forEach(name => {
      let pin = this.outputPins[name]
      pin.drawConnection();
    })
  }
}