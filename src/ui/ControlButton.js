export default class
{
  constructor(controller) {
    controller.on('mode.change', mode => {
      this.mode = mode;
      if(this.mode == 'stage mode') {
        this.stageMode();
      }
      else {
        this.brainMode();
      }
    })
  }

  stageMode() {
  }

  brainMode() {
  }

  set enabled(v) {
    this._enabled = v;
    if(this._enabled) {
      this.element.style.opacity = 1;
      this.element.style.cursor = 'pointer';
      this.element.style.pointerEvents = 'inherit';
    }
    else {
      this.element.style.opacity = 0.2;
      this.element.style.cursor = 'auto',
      this.element.style.pointerEvents = 'none';
    }
  }

  get enabled() {
    return this._enabled;
  }
}