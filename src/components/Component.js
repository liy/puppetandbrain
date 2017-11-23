export default class Component extends PIXI.utils.EventEmitter
{
  constructor() {
    super();
    this.entity = null;
  }

  destroy() {
    PIXI.ticker.shared.remove(this.tick, this)
  }

  added() {

  }

  removed() {
    PIXI.ticker.shared.remove(this.tick, this)
  }

  set tickEnabled(v) {
    if(v) {
      // tick logic before rendering!
      PIXI.ticker.shared.add(this.tick, this, PIXI.UPDATE_PRIORITY.HIGH)
    }
    else {
      PIXI.ticker.shared.remove(this.tick, this)
    }
  }

  tick() {

  }
}