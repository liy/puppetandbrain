import Debounce from './Debounce';
import PreAcceptance from './PreAcceptance';
import EventEmitter from '../utils/EventEmitter';

export default class Switch extends EventEmitter
{
  constructor(debounce=0, preAcceptance=0){
    super();
    this.enabled = true;

    // physical device id mapping
    this.keyMap = {
      9:  'left',
      32: 'left',
      49: 'left',
      13: 'right',
      51: 'right'
    }

    this.debounce = new Debounce(debounce);

    this.switchDownMap = Object.create(null);

    // By default, space character input is disabled, since the default action of space bar
    // is scrolling web page, which will cause problems for switch users.
    // If an application temporarily needs space character input, programmer should enable
    // it in his program, e.g., a textfield is in focus, etc.
    this.enableSpace = false;
    this.enableTab = false;
    this.preventDefaults = this.preventDefaults.bind(this);
    document.addEventListener('keydown', this.preventDefaults);

    this.keydown = this.keydown.bind(this);
    this.keyup = this.keyup.bind(this);
    // Add pre-acceptance filter, auto trigger keydown or keyup when pre-acceptanec is processed.
    this.preAcceptance = new PreAcceptance(preAcceptance, this.keydown, this.keyup)
  }

  destroy() {
    this.preAcceptance.destroy();
    document.removeEventListener('keydown', this.preventDefaults);
  }

  preventDefaults(e) {
    // preventing space bar scrolling web page.
    if(!this.enableSpace && e.keyCode === 32){
      e.preventDefault();
    }
    
    if(!this.enableTab && e.keyCode === 9){
      e.preventDefault();
    }
  }

  keydown(e) {
    if(!this.enabled){
      return;
    }

    // debounce
    if(!this.debounce.filter(e.keyCode)) {
      return;
    }

    if(this.isKeyAllowed(e.keyCode)){
      this.processSwitchDown(e.keyCode)
    }
  }

  keyup(e){
    if(!this.enabled){
      return;
    }

    if(this.isKeyAllowed(e.keyCode)){
      this.processSwitchUp(e.keyCode);
    }
  }

  processSwitchDown(keyCode){
    this.switchDownMap[keyCode] = true;
    this.emit('switch.down', {
      keyCode: keyCode,
      which: this.keyMap[keyCode]
    });
  }

  processSwitchUp(keyCode) {
    if(!this.switchDownMap[keyCode]) {
      return;
    }

    this.switchDownMap[keyCode] = false;
    this.emit('switch.up', {
      keyCode: keyCode,
      which: this.keyMap[keyCode]
    });
  }

  isKeyAllowed(keyCode){
    return !!this.keyMap[keyCode];
  }
}