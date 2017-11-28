import TaskBlock from "./TaskBlock";
import BlockSelection from '../BlockSelection';
require('./PerformBlock.scss')

export default class PerformBlock extends TaskBlock
{
  constructor(node, graph) {
    super(node, graph);

    this.clicks = 0;
    this.dbclick = this.dbclick.bind(this)
    this.dragArea.addEventListener('mousedown', this.dbclick)
  }

  dbclick(e) {
    if(e.target != this.dragArea) return;

    setTimeout(() => {
      this.clicks = 0;
    }, 300);
    if(++this.clicks % 2 == 0) {
      BrainGraph.close();
      BrainGraph.open(this.node.target.brain);
      BlockSelection.select(BrainGraph.getBlock(this.node.action.id));
      // Select the actor as well!
      this.node.action.owner.getComponent('SelectionComponent').select();
    }
  }
}