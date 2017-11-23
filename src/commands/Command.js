export default class Command
{
  constructor() {
    this.passThrough = false;
  }

  push() {
    History.push(this);
  }

  process() {

  }

  undo() {

  }

  redo() {

  }
}