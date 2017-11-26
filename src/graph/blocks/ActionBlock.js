import TaskBlock from "./TaskBlock";

export default class ActionBlock extends TaskBlock
{
  constructor(node) {
    super(node);
    this.content.classList.add('action-block');
  }
}