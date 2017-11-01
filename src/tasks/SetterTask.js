export default class SetterTask extends Task
{
  constructor() {
    this.inputs.
  }

  process() {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, this.inputs.value('seconds')*1000)
    });
  }
}