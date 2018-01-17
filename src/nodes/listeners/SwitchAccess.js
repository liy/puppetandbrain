import Switch from '../../switch/Switch';
import {Listener, Template as ParentTemplate} from "./Listener";
import DataType from "../../data/DataType";

NodeTemplate.SwitchAccess = {
  ...ParentTemplate,
  name: 'Switch',
  execution: [{
    name: 'down'
  }, {
    name: 'up'
  }],
  inputs: [{
    name: 'debounce',
    type: DataType.GENERIC,
  }, {
    name: 'pre-acceptance',
    type: DataType.GENERIC,
  }],
  outputs: [{
    name: 'switch id',
    type: DataType.GENERIC
  }],
  memory: {
    debounce: 0,
    'pre-acceptance': 0
  },
  keywords: [...ParentTemplate.keywords, 'switch access', 'accessibility']
}

export default class SwitchAccess extends Listener
{
  constructor(id) {
    super(id);

    this.switchdown = this.switchdown.bind(this);
    this.switchup = this.switchup.bind(this);
    this.prestart = this.prestart.bind(this);
    this.stop = this.stop.bind(this);

    Editor.on('game.prestart', this.prestart, this)
    Editor.on('game.stop', this.stop, this)

    this.switch = new Switch(this);
  }

  destroy() {
    super.destroy();

    Editor.off('game.prestart', this.prestart, this)
    Editor.off('game.stop', this.stop, this)

    this.switch.destroy();
    this.switch.off('switch.down', this.switchdown)
    this.switch.off('switch.up', this.switchup)
  }

  prestart() {
    // FIXME: if this block is deleted and redo, while game is playing
    // the event will not be registered.
    // perhaps use promise??
    this.switch.on('switch.down', this.switchdown)
    this.switch.on('switch.up', this.switchup)
  }

  stop() {
    this.switch.off('switch.down', this.switchdown)
    this.switch.off('switch.up', this.switchup)
  }

  switchdown(data) {
    super.run();

    this.outputs.assignValue('switch id', data.switchID);
    this.execution.run('down');
  }

  switchup(data) {
    super.run();
    
    this.outputs.assignValue('switch id', data.switchID);
    this.execution.run('up');
  }
}