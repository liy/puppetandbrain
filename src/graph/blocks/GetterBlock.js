import DataBlock from "./DataBlock";
import OutputPin from "../OutputPin";

export default class GetterBlock extends DataBlock
{
  constructor(node) {
    super(node);

    this.content.classList.add('getter-block');
  }
}