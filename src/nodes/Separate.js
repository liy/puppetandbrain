import Output from "../data/Output";
import DataNode from "./DataNode";

export default class Separate extends DataNode
{
  constructor(id) {
    super(id)
    
    this.inputs.addInput('in');

    // outputs is setup by the block
  }
}
