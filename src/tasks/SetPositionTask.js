export default class SetPositionTask extends Task
{
  constructor() {
    super();
  }

  init(data) {
    super.init(data);
    this.inputs.create('actor');
    this.inputs.create('position');
  }

  process() {
    let actor = LookUp.get(this.inputs.value('actor'));
    let p = this.inputs.value('position');
    actor.x = p.x;
    actor.y = p.y;
    return Promise.resolve();
  }
}