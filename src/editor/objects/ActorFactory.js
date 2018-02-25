import * as ns from './'

export default {
  create: function(className, id) {
    return new ns[className](id);
  }
}