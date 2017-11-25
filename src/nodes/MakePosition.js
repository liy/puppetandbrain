import Output from "../data/Output";
import DataNode from "./DataNode";

export default class MakePosition extends DataNode
{
  constructor(id) {
    super(id)
    
    this.inputs.addInput('x');
    this.inputs.addInput('y');

    this.outputs.addOutput('position')
    this.outputs.assignProperty('position', {
      get: () => {
        return {
          x: this.inputs.value('x'),
          y: this.inputs.value('y')
        }
      }
    });
  }
}
