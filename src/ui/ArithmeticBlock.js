import OutputPin from "./OutputPin";
import Block from "./Block";
import InputPin from "./InputPin";
import VariableGetter from "../getters/VariableGetter";

export default class ArithmeticBlock extends Block
{
  constructor(model) {
    super(model);

    let minWidth = 120;
    let minHeight = 40;
    this.container.className += ' arithmetic-block'
    this.container.style = `min-height:${minHeight}px; min-width:${minWidth}px;`;    
    
    this.inPin = null;
    this.outPins = Object.create(null);
  
    this.title = document.createElement('div');
    this.title.className = 'title'
    this.container.appendChild(this.title);
    this.title.textContent = this.model.__proto__.constructor.name;

    this.content = document.createElement('div');
    this.container.appendChild(this.content);

    let rows = [];
    let row = (i) => {
      if(!rows[i]) {
        rows[i] = document.createElement('div');
        rows[i].className = 'row';
        this.content.appendChild(rows[i]);
      }
      return rows[i]
    }

    for(let i=0; i<this.model.inputs.list.length; ++i) {
      let name = this.model.inputs.list[i];
      let input = this.model.inputs.get(name);
      let pin = new InputPin(this.model.inputs.get(name))
      row(i).appendChild(pin.container);
      this.inputPins[name] = pin;

      if(input instanceof VariableGetter) {
        let inputField = document.createElement('input');
        inputField.value = input.value;
        pin.inputField = inputField;
        pin.container.appendChild(inputField)
      }
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