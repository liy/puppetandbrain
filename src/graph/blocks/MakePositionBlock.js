import Block from "./Block";
import InputPin from "../InputPin";
import OutputPin from "../OutputPin";

export default class MakePositionBlock extends Block
{
  constructor(node, graph) {
    super(node, graph);
    
    let minWidth = 130;
    let minHeight = 40;
    this.container.className += ' operator-block'
    this.container.style.minWidth = `${minWidth}px`;
    this.container.style.minHeight = `${minHeight}px`;
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
      let pin = new InputPin(this, name)
      row(i).appendChild(pin.container);
      this.inputPins.set(name, pin);

      // if(pointer.isLocalPointer) {
      //   let inputField = document.createElement('input');
      //   inputField.value = pointer.value;
      //   pin.inputField = inputField;
      //   pin.container.appendChild(inputField)

      //   inputField.addEventListener('change', (e) => {
      //     this.node.variables[name] = Number(e.target.value);
      //   })
      // }
    }

    let pin = new OutputPin(this, 'position');
    row(0).appendChild(pin.container);
    this.outputPins.set('position', pin);
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