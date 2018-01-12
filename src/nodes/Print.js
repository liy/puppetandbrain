import {Task, Template as TaskTemplate} from './Task';
import DataType from '../data/DataType';

NodeTemplate.Print = {
  ...TaskTemplate,
  input: [{
    name: 'text',
    type: DataType.GENERIC,
  }]
}

export default class extends Task
{
  constructor(id) {
    super(id);

    this.debugTrace = document.getElementById('debug-trace');

    this.inputs.addInput('text');
  }

  get nodeName() {
    return 'Print';
  }

  run() {
    super.run()

    let message = this.inputs.value('text');
    console.log('%c%s', 'color: green', message);
    
    let p = document.createElement('p');
    p.textContent = message;
    this.debugTrace.prepend(p)

    setTimeout(() => {
      if(this.debugTrace.contains(p)) this.debugTrace.removeChild(p);
    }, 3000);

    this.execution.run()
  }
}