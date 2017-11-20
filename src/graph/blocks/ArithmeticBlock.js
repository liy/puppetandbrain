import OutputPin from "../OutputPin";
import Block from "./Block";
import InputPin from "../InputPin";

export default class ArithmeticBlock extends Block
{
  constructor(node) {
    super(node);

    let minWidth = 130;
    let minHeight = 40;
    this.container.className += ' arithmetic-block'
    this.container.style = `min-height:${minHeight}px; min-width:${minWidth}px;`;

    this.title = document.createElement('div');
    this.title.className = 'title'
    this.container.appendChild(this.title);
    this.title.textContent = this.node.nodeName;

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

    for(let i=0; i<this.node.inputs.names.length; ++i) {
      let name = this.node.inputs.names[i];
      let pointer = this.node.inputs.get(name);
      let pin = new InputPin(name)
      row(i).appendChild(pin.container);
      this.inputPins.set(name, pin);

      if(pointer.isLocalPointer) {
        let inputField = document.createElement('input');
        inputField.value = pointer.value;
        pin.inputField = inputField;
        pin.container.appendChild(inputField)

        inputField.addEventListener('change', (e) => {
          this.node.variables[name] = Number(e.target.value);
        })
      }
    }

    let pin = new OutputPin('value');
    row(0).appendChild(pin.container);
    this.outputPins.set('value', pin);
  }

  dragmove(e) {
    super.dragmove(e);

    // output input pins
    for(let pin of this.inputPins.getValues()) {
      pin.drawConnection();
    }
    for(let pin of this.outputPins.getValues()){
      pin.drawConnection();
    }
  }
}