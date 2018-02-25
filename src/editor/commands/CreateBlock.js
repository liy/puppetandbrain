import Command from './Command';
import GraphSelection from '../graph/GraphSelection'
import ActivityManager from '../ActivityManager';

export default class CreateBlock extends Command
{
  constructor(pod, ownerID) {
    super();
    this.ownerID = ownerID;
    this.pod = pod;
    
    // position will be further transformed using brain graph's transformation
    this.pod.x = (this.pod.x - BrainGraph.translateX) / BrainGraph.scale;
    this.pod.y = (this.pod.y - BrainGraph.translateY) / BrainGraph.scale;

    // When redo, use this node id
    this.nodeID = null;
  }

  process() {
    let node = NodeFactory.create(this.pod.className, this.nodeID, ActivityManager.current);
    node.init({
      ...this.pod,
      ownerID: this.ownerID
    })

    this.nodeID = node.id;

    let block = BlockFactory.create(node);
    GraphSelection.select(block);

    return this;
  }

  undo() {
    let block = BrainGraph.getBlock(this.nodeID);
    BrainGraph.deleteBlock(block);
  }

  getCreatedNode() {
    return this.lookUp.get(this.nodeID);
  }

  redo() {
    this.process();
  }
}