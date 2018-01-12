import {Listener, Template as ListenerTemplate} from "./Listener";
import Switch from '../../switch/Switch';

NodeTemplate.SwitchAccess = {
  ...ListenerTemplate,
  out: ['down', 'up'],
  name: 'Switch',
  input: [{
    name: 'debounce',
    type: 'number',
  }, {
    name: 'pre-acceptance',
    type: 'number',
  }],
  output: [{
    name: 'which',
    type: 'string'
  }]
}

export default class SwitchAccess extends Listener
{
  constructor(id) {
    super(id);

    this.switchdown = this.switchdown.bind(this);
    this.switchup = this.switchup.bind(this);

    // this.inputs.addInput('debounce');
    // this.inputs.addInput('pre-acceptance');

    // this.execution.remove('default')
    // this.execution.set('switch down');
    // this.execution.set('switch up');

    // this.outputs.addOutput('which');

    Stage.on('game.prestart', this.prestart, this)
    Stage.on('game.stop', this.stop, this)

    this.switch = new Switch(this);
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

  get nodeName() {
    return 'Switch Access'
  }

  switchdown(data) {
    super.run();
    
    this.outputs.assignValue('which', data.which);
    this.execution.run('switch down');
  }

  switchup(data) {
    super.run();
    
    this.outputs.assignValue('which', data.which);
    this.execution.run('switch up');
  }


}