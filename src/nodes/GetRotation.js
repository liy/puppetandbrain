import DataNode from "./DataNode";
import utils from '../utils/utils'

export default class GetRotation extends DataNode
{
  constructor(id) {
    super(id)

    this.inputs.addInput('target')

    this.outputs.addOutput('rotation');
    this.outputs.assignProperty('rotation', {
      get: () => {
        return LookUp.get(this.variables.target)['rotation'] * utils.toDegree
      }
    });
  }

  init(pod) {
    super.init(pod)

    this.variables.target = this.owner.id;
  }

  get nodeName() {
    return 'Get Rotation';
  }
}
