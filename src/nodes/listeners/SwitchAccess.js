import Switch from '../../switch/Switch';
import {Listener, Template as ParentTemplate} from "./Listener";
import DataType from "../../data/DataType";

NodeTemplate.SwitchAccess = {
  ...ParentTemplate,
  name: 'Switch',
  execution: [{
    executionName: 'down'
  }, {
    executionName: 'up'
  }],
  inputs: [{
    inputName: 'debounce',
    type: DataType.GENERIC,
  }, {
    inputName: 'pre-acceptance',
    type: DataType.GENERIC,
  }],
  outputs: [{
    name: 'switch id',
    type: DataType.GENERIC
  }]
}

export default class SwitchAccess extends Listener
{
  constructor(id) {
    super(id);

    this.switchdown = this.switchdown.bind(this);
    this.switchup = this.switchup.bind(this);

    Stage.on('game.prestart', this.prestart, this)
    Stage.on('game.stop', this.stop, this)

    this.switch = new Switch(this);
  }

  destroy() {
    super.destroy();

    Stage.off('game.prestart', this.prestart, this)
    Stage.off('game.stop', this.stop, this)

    this.switch.destroy();
    this.switch.off('switch.down', this.switchdown)
    this.switch.off('switch.up', this.switchup)
  }

  prestart() {
    // FIXME: if this block is deleted and redo, while game is running
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
    this.execution.run('switch down');
  }

  switchup(data) {
    super.run();
    
    this.outputs.assignValue('switch id', data.switchID);
    this.execution.run('switch up');
  }


}