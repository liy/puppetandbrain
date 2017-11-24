import OperatorBlock from "./OperatorBlock";

export default class RandomNumberBlock extends OperatorBlock
{
  constructor(node, graph) {
    super(node, graph);

    console.log(this.node.inputs)
  }
}