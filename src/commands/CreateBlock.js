import Command from './Command';
import BlockSelection from '../graph/BlockSelection'

export default class CreateBlock extends Command
{
  constructor(pod, ownerID) {
    super();
    this.ownerID = ownerID;
    this.pod = pod;
    

    // When redo, use this node id
    this.nodeID = null;
  }

  process() {
    let node = NodeFactory.create(this.pod.className, this.nodeID);
    node.init({
      ...this.pod,
      ownerID: this.ownerID
    })

    this.nodeID = node.id;

    let block = BlockFactory.create(node);
    BlockSelection.select(block);

    return this;
  }

  undo() {
    let block = BrainGraph.getBlock(this.nodeID);
    BrainGraph.deleteBlock(block);
  }

  getCreatedNode() {
    return LookUp.get(this.nodeID);
  }

  redo() {
    this.process();
  }
}