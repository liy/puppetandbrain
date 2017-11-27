import Command from './Command';
import BlockSelection from '../graph/BlockSelection'

export default class CreateBlock extends Command
{
  constructor(pod, ownerID, x, y) {
    super();
    this.ownerID = ownerID;
    this.pod = pod;
    
    // Note the position needs to be transformed 
    this.x = (x - BrainGraph.translateX) / BrainGraph.scale;
    this.y = (y - BrainGraph.translateY) / BrainGraph.scale;

    // When redo, use this node id
    this.nodeID = undefined;
  }

  process() {
    // Check there are existing Action with same name
    if(this.pod.className == 'Action') {
      let existingAction = LookUp.get(this.ownerID).actions[this.pod.actionName];
      if(existingAction) {
        BlockSelection.select(BrainGraph.getBlock(existingAction.id));
        return null;
      }
    }

    let node = NodeFactory.create(this.pod.className, this.nodeID);
    node.init({
      ...this.pod,
      owner: LookUp.get(this.ownerID),
      x: this.x,
      y: this.y
    })

    this.nodeID = node.id;

    let block = BlockFactory.create(node);

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