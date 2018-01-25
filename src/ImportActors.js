import * as ObjecClasses from './objects';
import Variable from './data/Variable';

export default class ImportActors
{
  constructor() {
    this.mapping = {};
  }

  async start(pod) {
    await this.createActors(pod);
    this.createNodes(pod);
  }

  /**
   * Importing will delegate actor assets preloading to individual actor
   * @param {*} pod 
   */
  async createActors(pod) {
    return Promise.all(pod.actors.map(async id => {
      // note that I do not need to remove brainID from actorPod.
      // Because LookUp will generate a new ID if brainID exist.
      let actorPod = pod.store[id];
      // TODO: do edge checking?
      actorPod.position.x += 10;
      actorPod.position.y += 10;
      let actor = new ObjecClasses[actorPod.className]();
      Editor.stage.addActor(actor);

      // preload actor and then initialize it
      await actor.preload(actorPod);

      // map new item with old id
      this.mapping[id] = actor;
      this.mapping[actorPod.brainID] = actor.brain;

      // create variable for the actor brain
      let brainPod = pod.store[actorPod.brainID];
      for(let variableID of brainPod.variables) {
        let variable = actor.brain.variables.create(pod.store[variableID])
        this.mapping[variableID] = variable;
      }
    }))
  }

  createNodes(pod) {
    if(!pod.nodes) return;

    let performs= [];
    for(let id of pod.nodes) {
      let nodePod = pod.store[id];
      let node = NodeFactory.create(nodePod.className);

      // change owner
      nodePod.ownerID = this.mapping[nodePod.ownerID].id;

      switch(nodePod.className) {
        case 'Getter':
        case 'Setter':
          nodePod.variableID = this.mapping[nodePod.variableID].id;
          node.init(nodePod);
          break;
        case 'PropertyGetter':
          // check the puppet is also imported, then change the id.
          let actor = this.mapping[nodePod.memory.puppet];
          nodePod.memory.puppet = actor ? actor.id : nodePod.memory.puppet;
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
      // change actionID
      data.pod.actionID = this.mapping[data.pod.actionID].id;
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
        let output = LookUp.get(outputNode.id).outputs.get(pointerPod.output.name);
        input.connect(output);
      }
    }
  }
}