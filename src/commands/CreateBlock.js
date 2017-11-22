import Command from './Command';

export default class CreateBlock extends Command
{
  constructor(owner, pod, x, y) {
    super();
    console.log(owner)
    this.owner = owner;
    this.pod = pod;
    this.x = x;
    this.y = y;
    this.nodeID = undefined;

    this.push();
  }

  process() {
    let node = NodeFactory.create(this.pod.className, this.nodeID);
    node.init({
      ...this.pod,
      owner: this.owner,
      x: this.x,
      y: this.y
    })

    let block = BlockFactory.create(node, BrainGraph)
    BrainGraph.addBlock(block);

    this.nodeID = node.id;
  }

  undo() {
    let block = BrainGraph.getBlock(this.nodeID);
    block.delete();
    BrainGraph.removeBlock(block);
    this.owner.brain.removeNode(block.node);
  }

  redo() {
    this.process();
  }
}