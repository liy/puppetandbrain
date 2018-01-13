import {Listener, Template as ParentTemplate} from "./Listener";

NodeTemplate.GameStart = {
  ...ParentTemplate,
  name: 'Game Start'
}

console.log(NodeTemplate.GameStart)

export default class GameStart extends Listener
{
  constructor(id) {
    super(id);

    this.start = this.start.bind(this)
    Stage.on('game.start', this.start)
  }

  destroy() {
    super.destroy();
    Stage.off('game.start', this.start)
  }
  
  start(e) {
    super.run();
    this.execution.run();
  }
}