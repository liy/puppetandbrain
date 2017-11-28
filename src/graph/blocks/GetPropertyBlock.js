import OutputPin from "../OutputPin";
import InputPin from "../InputPin";
import DataBlock from "./DataBlock";
require('./GetPropertyBlock.scss')

export default class GetPropertyBlock extends DataBlock
{
  constructor(name, node) {
    super(node);
    
    this.minWidth = 100;
  }
}