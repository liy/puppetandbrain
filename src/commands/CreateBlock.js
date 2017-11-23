import Command from './Command';

export default class CreateBlock extends Command
{
  constructor(owner, pod, x, y) {
    super();
    this.ownerID = owner.id;
    this.pod = pod;
    this.x = x;
    this.y = y;
    // When redo, use this node id
    this.nodeID = undefined;
  }

  process() {
    let node = NodeFactory.create(this.pod.className, this.nodeID);
    node.init({
      ...this.pod,
      owner: LookUp.get(this.ownerID),
      x: this.x,
      y: this.y
    })

    this.nodeID = node.id;

    BlockFactory.create(node, BrainGraph);

    return this;
  }

  undo() {
    let block = BrainGraph.getBlock(this.nodeID);
    BrainGraph.deleteBlock(block);
  }

  redo() {
    this.process();
  }
}