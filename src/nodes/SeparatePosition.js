import Output from "../data/Output";
import DataNode from "./DataNode";

export default class SeparatePosition extends DataNode
{
  constructor(id) {
    super(id)
    
    this.inputs.addInput('in');

    this.outputs.addOutput('x');
    this.outputs.assignProperty('x', {
      get: () => {
        return this.inputs.value('in').x
      }
    });
    this.outputs.addOutput('y');
    this.outputs.assignProperty('y', {
      get: () => {
        return this.inputs.value('in').y
      }
    });
  }
}
