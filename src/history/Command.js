import History from './History';

export default class Command
{
  constructor() {

  }

  init(data) {
    History.push(this);
  }

  porcess() {

  }

  undo() {

  }

  redo() {

  }
}