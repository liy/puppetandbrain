/**
 * It is a good pratice to avoid using reference in undo and redo.
 * As the reference might changes(during modification).
 * Use id to retrieve the actual object instead.
 */
export default class Command
{
  constructor() {
    this.passThrough = false;
  }

  get lookUp() {
    return ActivityManager.current.lookUp;
  }

  processAndSave() {
    let command = this.process();
    if(command) ActivityManager.autoSave();
    return command;
  }

  process() {
    
  }

  undo() {

  }

  redo() {

  }
}