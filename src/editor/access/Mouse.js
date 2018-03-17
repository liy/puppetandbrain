import EventEmitter from "@/utils/EventEmitter";
import Vec2 from '../math/Vec2'
import {isMobile} from "@/utils/utils";

export default class extends EventEmitter
{
  constructor(stage) {
    super();
    this.stage = stage;

    this.move = this.move.bind(this);
    this.updateTouchPosition = this.updateTouchPosition.bind(this)

    this.threshold = 300; 
    this.thresholdID = 0;

    this._position = new Vec2();
    
    if(isMobile) {
      // Update mouse position for GetMousePosition block query purpose
      this.stage.canvas.addEventListener('touchstart', this.updateTouchPosition);
      this.stage.canvas.addEventListener('touchmove', this.updateTouchPosition);

      Object.defineProperty(this, 'position', {
        get() {
          return this._position;
        }
      });
    }
  }

  registerRenderer(renderer) {
    this.renderer = renderer;

    if(!isMobile) {
      Object.defineProperty(this, 'position', {
        get() {
          var p = this.renderer.plugins.interaction.mouse.global;
          this._position.x = p.x;
          this._position.y = p.y;
          return this._position;
        }
      });
    }
  }

  destroy() {
    super.destroy();

    this.stage.canvas.removeEventListener('touchstart', this.updateTouchPosition);
    this.stage.canvas.removeEventListener('touchmove', this.updateTouchPosition);

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

  updateTouchPosition(e) {
    const rect = this.stage.canvas.getBoundingClientRect();

    // override position
    this._position.x = e.touches[0].clientX - rect.left;
    this._position.y = e.touches[0].clientY - rect.top;
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