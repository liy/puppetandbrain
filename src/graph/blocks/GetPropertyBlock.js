import OutputPin from "../OutputPin";
import InputPin from "../InputPin";
import DataBlock from "./DataBlock";

export default class GetPropertyBlock extends DataBlock
{
  constructor(name, node) {
    super(node);
    
    this.minWidth = 100;
  }
}