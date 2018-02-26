import EventEmitter from "@/utils/EventEmitter";
import Vec2 from '../math/Vec2'

export default class extends EventEmitter
{
  constructor(renderer) {
    super();

    this.renderer = renderer;
    this.move = this.move.bind(this);

    this.threshold = 300; 
    this.thresholdID = 0;

    this._position = new Vec2();
  }

  get position() {
    var p = this.renderer.plugins.interaction.mouse.global;
    this._position.x = p.x;
    this._position.y = p.y;
    return this._position;
  }

  destroy() {
    super.destroy();

    clearTimeout(this.thresholdID);
    document.removeEventListener('mousemove', this.move);
    document.removeEventListener('touchmove', this.move);
  }

  gamePreStart() {
    document.addEventListener('mousemove', this.move);
    document.addEventListener('touchmove', this.move);
  }

  gameStop() {
    clearTimeout(this.thresholdID);
    document.removeEventListener('mousemove', this.move);
    document.removeEventListener('touchmove', this.move);
  }

  move(e) {
    clearTimeout(this.thresholdID);
    this.emit('mouse.move', e);
    this.thresholdID = setTimeout(() => {
      this.stop(e)
    }, this.threshold);
  }

  stop(e) {
    this.emit('mouse.stop', e)
  }
}