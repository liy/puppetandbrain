import * as ns from './'

export default {
  create: function(className, id, lookUp) {
    return new ns[className](id, lookUp);
  }
}