import Node from "./Node";

export default class GetPosition extends Node
{
  constructor(id) {
    super(id)

    this.inputs.addInput('target')
  }

  init(pod) {
    super.init(pod);

    this.variables.target = this.owner.id;

    let output = this.outputs.addOutput('position');
    output.assignProperty('position', {
      get: () => {
        return LookUp.get(this.variables.target)['position']
      }
    });
  }

  get nodeName() {
    return 'Get Position';
  }

  get elementClassName() {
    return ['property', 'getter'];
  }
}
