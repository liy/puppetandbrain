import Block from "./Block";
import BlockSelection from '../BlockSelection';

export default class PerformBlock extends Block
{
  constructor() {
    super();

    this.clicks = 0;
    this.dbclick = this.dbclick.bind(this)
    this.element.addEventListener('mousedown', this.dbclick)
  }

  dbclick(e) {
    if(e.target != this.element) return;

    setTimeout(() => {
      this.clicks = 0;
    }, 300);
    if(++this.clicks % 2 == 0) {
      BrainGraph.switchTo(this.node.target.brain);
      BlockSelection.select(BrainGraph.getBlock(this.node.action.id));
      // Select the actor as well!
      this.node.action.owner.getComponent('SelectionComponent').select();
    }
  }
}