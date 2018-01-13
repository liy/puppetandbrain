import {Task, Template as ParentTemplate} from './Task';
import DataType from '../data/DataType';

NodeTemplate.Print = {
  ...ParentTemplate,
  inputs: [{
    name: 'text',
    type: DataType.GENERIC,
  }],
  memory: {
    text: 'default text'
  },
  category: 'Utilities',
  elementClass: ['utility'],
  keywords: ['trace']
}

export default class Print extends Task
{
  constructor(id) {
    super(id);

    this.debugTrace = document.getElementById('debug-trace');
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