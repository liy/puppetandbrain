import Command from './Command';
import BlockSelection from '../graph/BlockSelection'

export default class CreateBlock extends Command
{
  constructor(pod, ownerID, x, y, autoConnect=null) {
    super();
    this.ownerID = ownerID;
    this.pod = pod;
    this.x = x;
    this.y = y;

    // FIXME: find a better way to handle auto connect!!!!
    // for auto connect created block
    this.autoConnect = autoConnect;

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

    if(this.autoConnect && node.execution) {
      let sourceNode = LookUp.get(this.autoConnect.node);
      if(this.autoConnect.connectParent) {
        sourceNode.connectParent(node, this.autoConnect.executionName)
      }
      else {
        sourceNode.connectNext(node, this.autoConnect.executionName)
      }
      BrainGraph.refresh();
    }

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