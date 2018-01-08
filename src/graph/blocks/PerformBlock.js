import Block from "./Block";
import BlockSelection from '../BlockSelection';
import AInputPin from "../support/AInputPin";

export default class PerformBlock extends Block
{
  constructor() {
    super();

    this.clicks = 0;
    this.dbclick = this.dbclick.bind(this)
    this.element.addEventListener('mousedown', this.dbclick)

    this.onOutputAdded = this.onOutputAdded.bind(this);
  }

  init(node) {
    super.init(node);
    
    // TODO: probably not needed
    if(this.node.action) {
      this.node.action.outputs.on('output.added', this.onOutputAdded);
    }
  }

  destroy() {
    this.element.removeEventListener('mousedown', this.dbclick)
    this.node.action.outputs.off('output.added', this.onOutputAdded);
    super.destroy()
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

  onOutputAdded(name) {
    let pin = new AInputPin(name);
    pin.init(this.node);
    this.body.addLeft(pin);
  }
}