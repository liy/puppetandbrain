import PropertyBlock from "./PropertyBlock";

export default class GetPositionBlock extends PropertyBlock
{
  constructor(node, graph) {
    super(node, graph);
    // sub properties
    this.node.outputs.get('value').properties = ['x', 'y']
  }
}