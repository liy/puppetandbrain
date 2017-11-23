import Command from './Command';

export default class CreateBlock extends Command
{
  constructor(owner, pod, x, y) {
    super();
    this.owner = owner;
    this.pod = pod;
    this.x = x;
    this.y = y;
    // When redo, use this node id
    this.nodeID = undefined;

    // this.push();
  }

  process() {
    let node = NodeFactory.create(this.pod.className, this.nodeID);
    node.init({
      ...this.pod,
      owner: this.owner,
      x: this.x,
      y: this.y
    })

    this.nodeID = node.id;

    BlockFactory.create(node, BrainGraph)
  }

  undo() {
    let block = BrainGraph.getBlock(this.nodeID);
    BrainGraph.deleteBlock(block);
  }

  redo() {
    this.process();
  }
}