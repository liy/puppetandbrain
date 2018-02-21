import * as cmds from './';

window.Commander = {
  create: function(className, ...data) {
    let cmd = new cmds[className](...data);
    return cmd;
  }
}