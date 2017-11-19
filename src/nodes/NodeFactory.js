import * as ns from './'

// TODO: allow other name mapping? e.g, Print for trace

window.NodeFactory = {
  create: function(className, id) {
    return new ns[className]();
  }
}