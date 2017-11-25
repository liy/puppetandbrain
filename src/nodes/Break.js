import Output from "../data/Output";
import DataNode from "./DataNode";

export default class Break extends DataNode
{
  constructor(id) {
    super(id)
    
    this.inputs.addInput('in');
  }

  init(pod) {
    super.init(pod);
    
    for(let outputPod of pod.outputs) {
      this.outputs.assignProperty(outputPod.name, {
        get: () => {
          return this.inputs.value('in')[outputPod.name]
        }
      });
    }
  }
}
