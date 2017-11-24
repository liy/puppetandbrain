import DataNode from "./DataNode";

export default class GetRotation extends DataNode
{
  constructor(id) {
    super(id)

    this.inputs.addInput('target')

    this.outputs.addOutput('rotation');
    this.outputs.assignProperty('rotation', {
      get: () => {
        return LookUp.get(this.variables.target)['rotation']
      }
    });
  }

  get nodeName() {
    return 'Get Rotation';
  }
}
