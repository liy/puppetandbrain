import TaskBlock from "./TaskBlock";

export default class ListenerBlock extends TaskBlock
{
  constructor(node) {
    super(node);
    this.container.classList.add('listener-block')
  }
}