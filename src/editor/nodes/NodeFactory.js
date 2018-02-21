import * as ns from './'

window.NodeFactory = {
  create: function(className, id) {
    return new ns[className](id);
  }
}