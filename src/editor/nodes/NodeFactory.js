import * as ns from './'

window.NodeFactory = {

  /**
   * create an empty node shell
   * Usefull when loading and history management
   * 
   * @param {String} className Node class name
   * @param {string} id A node id if it is loaded from a JSON. If undefined or null, new id will be gerneated. If it exists, new id will also be generated.
   * @param {Activity} activity The activity instane holds this node.
   */
  shell(className, id, activity) {
    return new ns[className](id, activity);
  },
  /**
   * Instantiate a node and add it to an actor
   * @param {String} className Node class name
   * @param {Actor} actor An actor instance owns the node
   * @param {Activity} activity The activity holds the node
   */
  create(className, actor, activity, x=120, y=150) {
    const node = this.shell(className, undefined, activity);
    const pod = NodeTemplate.clone(className)
    pod.ownerID = actor.id;
    pod.x = x;
    pod.y = y;
    node.init(pod)

    return node;
  }
}