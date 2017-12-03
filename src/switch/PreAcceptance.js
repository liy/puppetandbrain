import Delay from './Delay';

export default class PreAcceptance
{
  constructor(preAcceptance, keyDown, keyUp) {
    this.preAcceptance = preAcceptance;
    this.keyDown = keyDown;
    this.keyUp = keyUp;

    // filter duplicate raw key event
    this.keyFilter = {};
    // Only allow key up if a valid pre-acceptance key is down
    this.keyDownMap = {};

    this.delays = {};

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);
  }

  destroy() {
    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('keyup', this.onKeyUp);

    for(let key in this.delays) {
      this.delays[key].cancel();
    }
  }

  async onKeyDown(e) {
    if(this.keyFilter[e.keyCode]) {
      return;
    }
    this.keyFilter[e.keyCode] = true;
    
    // if preAccetance is 0 or not defined, no need to wait
    if(!!this.preAcceptance) {
      let delay = this.delays[e.keyCode] = new Delay();
      await delay.wait(this.preAcceptance);
    }
    
    this.keyDownMap[e.keyCode] = true;

    this.keyDown(e);
  }

  onKeyUp(e) {
    this.keyFilter[e.keyCode] = false;

    // if pre acceptance is 0 or undefined, there would be no delay
    if(this.delays[e.keyCode]) {
      // key up too earlier, which stops onKeyDown awaited aynsc function
      this.delays[e.keyCode].cancel();
    }

    if(this.keyDownMap[e.keyCode]) {
      this.keyDownMap[e.keyCode] = false;

      this.keyUp(e);
    }
  }
}