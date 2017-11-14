import Task from './Task'

export default class Trace extends Task
{
  constructor() {
    super();

  }

  init(data) {
    super.init(data);

    this.variables.text = data.text;

    this.inputs.add('text');
  }
  
  run() {
    super.run()
    // TODO: print on the actual editor console
    console.log('%c%s', 'color: green', this.inputs.value('text')); 
    
    this.execution.run()
  }
}