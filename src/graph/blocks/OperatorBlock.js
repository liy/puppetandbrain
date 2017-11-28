import OutputPin from "../OutputPin";
import DataBlock from "./DataBlock";
import InputPin from "../InputPin";
require('./OperatorBlock.scss')

export default class OperatorBlock extends DataBlock
{
  constructor(node) {
    super(node);

    this.content.classList.add('operator-block')
    this.minWidth = 90;
  }
}