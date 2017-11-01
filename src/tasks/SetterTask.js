export default class SetterTask extends Task
{
  constructor() {
    super();
  }

  init(data) {
    super.init(data);
    this.inputs.create('seconds', data.seconds);
  }

  process() {
    
    return Promise.resolve();
  }
}