import * as ns from './'

export default {
  create: function(className, id, activity) {
    return new ns[className](id, activity);
  }
}