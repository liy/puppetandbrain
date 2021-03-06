import Node from "./Node";
import DataType from "../data/DataType";

NodeTemplate.set({
  className: 'Absolute',
  name: 'Absolute',
  inputs: [{
    name: 'number',
    descriptor: {
      type: DataType.DOUBLE,
    }
  }],
  outputs: [{
    name: 'absolute',
    descriptor: {
      type: DataType.DOUBLE
    }
  }],
  memory: {
    number: -1,
  },
  elementClass: ['arithmetic', 'collapsed'],
  category: 'Math',
})

/**
 * test
 * 
 * @param {any} pod Object
 * @memberof Absolute
 */
export default class Absolute extends Node
{
  constructor(id, activity) {
    super(id, activity);
  }

  init(pod) {
    super.init(pod);

    this.outputs.assignProperty('absolute', {
      get: () => {
        return Math.abs(this.inputs.value('number'));
      }
    });
  }
}