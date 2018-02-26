import * as ns from './'

window.NodeFactory = {
  create: function(className, id, activity) {
    return new ns[className](id, activity);
  }
}