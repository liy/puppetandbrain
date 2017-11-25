import DataNode from "./DataNode";

export default class GetPosition extends DataNode
{
  constructor(id) {
    super(id)

    this.inputs.addInput('target')
  }

  init(pod) {
    super.init(pod);

    this.variables.target = this.owner.id;

    this.outputs.addOutput('position');
    this.outputs.assignProperty('position', {
      get: () => {
        return LookUp.get(this.variables.target)['position']
      }
    });
  }

  get nodeName() {
    return 'Get Position';
  }
}
