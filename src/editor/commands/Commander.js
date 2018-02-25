import * as cmds from './';

export default {
  create: function(className, ...data) {
    let cmd = new cmds[className](...data);
    return cmd;
  }
}