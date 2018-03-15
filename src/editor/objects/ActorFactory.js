import * as ns from './'

export default {
  create: function(className, id, activity, pod) {
    return new ns[className](id, activity, pod);
  }
}