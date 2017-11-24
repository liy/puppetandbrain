import Output from "../data/Output";
import DataNode from "./DataNode";

export default class Separate extends DataNode
{
  constructor(id) {
    super(id)
    
    let input = this.inputs.addInput('in');
    this.onInputConnected = this.onInputConnected.bind(this);
    input.on('input.connected', this.onInputConnected);
  }

  onInputConnected(pointer) {
    console.log(Object.getOwnPropertyNames(pointer.value));
    // for(let name of Object.keys(pointer.value))
    // this.outputs.addOutput
  }
}
