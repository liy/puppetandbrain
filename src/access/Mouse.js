import EventEmitter from "../utils/EventEmitter";

export default class extends EventEmitter
{
  constructor() {
    super();

    this.move = this.move.bind(this)

    this.threshold = 300; 
    this.thresholdID = 0;
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
    this.emit('mouse.move', e)
    this.thresholdID = setTimeout(() => {
      this.stop(e)
    }, this.threshold);
  }

  stop(e) {
    this.emit('mouse.stop', e)
  }
}