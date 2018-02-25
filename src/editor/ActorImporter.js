import * as ObjecClasses from './objects';
import Variable from './data/Variable';

export default class
{
  constructor(lookUp) {
    this.lookUp = lookUp;
    this.mapping = {};
  }

  async start(pod) {
    let actor = await this.createActor(pod);
    this.createNodes(pod, actor);

    return actor;
  }

  /**
   * Importing will delegate actor assets preloading to actor itself
   * @param {*} pod 
   */
  async createActor(pod) {
    // just in case pod has no varialbe, node, or pointers
    pod.variables = pod.variables || [];
    pod.nodes = pod.nodes || [];
    pod.pointers = pod.pointers || [];  

    // Passing in the template actor id
    // Have to try to use the exisiting id, as command calling this process can be
    // undo and redo. Further redo action might have nodes who are referencing this actor.
    // Therefore, we need to try to keep the id the same.
    let actor = new ObjecClasses[pod.className](pod.id, this.lookUp);
    Editor.stage.addActor(actor);

    // preload actor and then initialize it
    // note that I do not need to remove brainID from actorPod.
    // Because lookUp will generate a new ID if brainID exist.
    await actor.preload(pod);
    actor.init(pod);

    // create variable for the actor brain
    // Note that, there is only 1 brain for an actor, so you can simply grab
    // the newly created brain to start adding variables.
    for(let variableID of pod.variables) {
      let variable = actor.brain.variables.create(pod.store[variableID])
      this.mapping[variableID] = variable;
    }

    return actor;
  }

  createNodes(pod, actor) {
    if(!pod.nodes) return;

    let performs= [];
    for(let id of pod.nodes) {
      let nodePod = pod.store[id];
      let node = NodeFactory.create(nodePod.className, this.lookUp);

      // change owner, no need to use mapping, since we can import only 1 actor at a time.
      nodePod.ownerID = actor.id;

      switch(nodePod.className) {
        case 'VariableGetter':
        case 'VariableSetter':
          nodePod.variableID = this.mapping[nodePod.variableID].id;
          node.init(nodePod);
          break;
        case 'PropertyGetter':
          // Size, position, rotation property getter has a puppet input
          if(nodePod.memory.puppet) {
            // check the puppet is also imported, then change the id.
            let actor = this.mapping[nodePod.memory.puppet];
            nodePod.memory.puppet = actor ? actor.id : nodePod.memory.puppet;
          }
          node.init(nodePod);
          break;
        case 'Perform':
          // delay init 
          performs.push({
            node,
            pod: nodePod,
          })
          break;
        default:
          node.init(nodePod);
          break;
      }

      this.mapping[id] = node;
    }

    // init perform node
    for(let data of performs) {
      // Action might not be part of this export,
      // therefore, it the action node id is not presented
      // in the mapping, just ignore it. Simply use the existing
      // actionID. 
      // Note the action node might exist, but nothing you can do about it.
      if(this.mapping[data.pod.actionID]) {
        // change actionID
        data.pod.actionID = this.mapping[data.pod.actionID].id;
      }
      data.node.init(data.pod);
    }

    // connect task
    for(let id of pod.nodes) {
      let node = this.mapping[id]
      if(node.execution) {
        let nodePod = pod.store[id];
        for(let execPod of nodePod.execution) {
          // ignore the connection are NOT part of the imported node
          let targetNode = this.mapping[execPod.nodeID];
          if(targetNode) {
            node.connectNext(targetNode, execPod.name)
          }
          
          // no need to do enter connection as the imported nodes should
          // have all the out going connection covered. 
          // Any other incoming connection are not from the imported nodes should
          // be ignored.
        }
      }
    }

    // data connection
    for(let id of pod.pointers) {
      let pointerPod = pod.store[id];
      // ignore any incoming data link from node that are not part of 
      // the imported nodes.
      let node = this.mapping[pointerPod.nodeID];
      let outputNode = this.mapping[pointerPod.output.nodeID];
      if(outputNode) {
        // change input and output node id to use imported node's id
        pointerPod.nodeID = node.id;
        pointerPod.output.nodeID = outputNode.id;
        
        let input = node.inputs.get(pointerPod.name);
        let output = this.lookUp.get(outputNode.id).outputs.get(pointerPod.output.name);
        input.connect(output);
      }
    }
  }
}