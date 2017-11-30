import Listener from "./Listener";

export default class PointerOver extends Listener
{
  constructor(id) {
    super(id);

    Stage.on('game.prestart', this.prestart, this)
    Stage.on('game.stop', this.stop, this)
  }

  get nodeName() {
    return 'Touch Hover'
  }

  destroy() {
    super.destroy();
    this.owner.off('pointerover', this.over, this)
  }

  prestart() {
    this.owner.on('pointerover', this.over, this)
  }

  stop() {
    this.owner.off('pointerover', this.over, this)
  }

  over(e) {
    super.run();
    this.execution.run();
  }
}