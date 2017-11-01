export default class GetPositionTask extends Task
{
  constructor() {
    super();
  }

  init(data) {
    super.init(data);
    this.inputs.create('actor');
    this.outputs.create('position', Object.create(null));
  }

  process() {
    let actor = LookUp.get(this.inputs.value('actor'));
    let p = this.inputs.get('position').value;
    p.x = actor.x;
    p.y = actor.y;
    return Promise.resolve();
  }
}