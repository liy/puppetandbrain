import DataType from "../data/DataType";
import Node from "./Node";

NodeTemplate.set({
  className: 'RandomNumber',
  name: 'Random Number',
  inputs: [],
  outputs: [{
    name: 'value',
    descriptor: {
      type: DataType.DOUBLE
    }
  }],
  elementClass: ['arithmetic', 'collapsed'],
  category: 'Math',
  keywords: ['random']
})

export default class RandomNumber extends Node
{
  constructor(id, activity) {
    super(id, activity);
  }

  init(pod) {
    super.init(pod);

    this.outputs.assignProperty('value', {
      get: () => {
        return this.value;
      }
    });
  }

  get nodeName() {
    return "Random Number"
  }

  get value() {
    return Math.random();
  }
}
