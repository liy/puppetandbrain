import TaskBlock from "./TaskBlock";

export default class ListenerBlock extends TaskBlock
{
  constructor(node) {
    super(node);
    this.content.classList.add('listener-block');    
    this.minWidth = 100;
  }
}