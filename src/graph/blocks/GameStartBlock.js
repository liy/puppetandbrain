import TaskBlock from "./TaskBlock";

export default class GameStartBlock extends TaskBlock
{
  constructor(node, graph) {
    super(node, graph);
    this.container.classList.add('listener-block')
  }
}