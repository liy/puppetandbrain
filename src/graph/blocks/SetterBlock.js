import TaskBlock from "./TaskBlock";

export default class SetterBlock extends TaskBlock
{
  constructor(node) {
    super(node);

    this.minWidth = 100;
  }
}