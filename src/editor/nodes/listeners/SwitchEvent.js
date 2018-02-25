import Switch from '../../access/Switch';
import {Listener, Template as ParentTemplate} from "./Listener";
import DataType from "../../data/DataType";

NodeTemplate.SwitchEvent = {
  ...ParentTemplate,
  className: 'SwitchEvent',
  name: 'Switch Event',
  execution: [{
    name: 'down'
  }, {
    name: 'up'
  }],
  inputs: [{
    name: 'debounce',
    descriptor: {
      type: DataType.DOUBLE,
      gadgetClassName: 'RangeField',
      min:0,
      max:10,
      decimalPlaces:1
    }
  }, {
    name: 'pre-acceptance',
    descriptor: {
      type: DataType.DOUBLE,
      gadgetClassName: 'RangeField',
      min: 0,
      max: 5,
      decimalPlaces: 1
    }
  }],
  outputs: [{
    name: 'switch id',
    descriptor: {
      type: DataType.DOUBLE
    }
  }],
  memory: {
    debounce: 0,
    'pre-acceptance': 0
  },
  keywords: [...ParentTemplate.keywords, 'switch access', 'accessibility']
}

export default class SwitchEvent extends Listener
{
  constructor(id, lookUp) {
    super(id, lookUp);

    Editor.on('game.prestart', this.prestart, this)
    Editor.on('game.stop', this.stop, this)

    this.switch = new Switch(this);
  }

  destroy() {
    super.destroy();

    Editor.off('game.prestart', this.prestart, this)
    Editor.off('game.stop', this.stop, this)

    this.switch.off('switch.down', this.switchdown, this)
    this.switch.off('switch.up', this.switchup, this)
    this.switch.destroy();
  }

  prestart() {
    // FIXME: if this block is deleted and redo, while game is playing
    // the event will not be registered.
    // perhaps use promise??
    this.switch.on('switch.down', this.switchdown, this)
    this.switch.on('switch.up', this.switchup, this)
  }

  stop() {
    this.switch.off('switch.down', this.switchdown, this)
    this.switch.off('switch.up', this.switchup, this)
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