/**
 * It is a good pratice to avoid using reference in undo and redo actions.
 * As the reference might changes(during modification).
 * Use id to retrieve the actual object instead.
 */
export default class Command
{
  constructor() {
    this.passThrough = false;
  }

  processAndSave() {
    let command = this.process();
    if(process.env.NODE_ENV !== 'dev') {
      if(command) LookUp.save();
    }
    return command;
  }

  process() {
    
  }

  undo() {

  }

  redo() {

  }
}