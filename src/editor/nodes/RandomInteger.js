import Node from "./Node";
import DataType from "../data/DataType";

NodeTemplate.set({
  className: 'RandomInteger',
  name: 'Random Integer',
  inputs: [{
    name: 'min',
    descriptor: {
      type: DataType.INTEGER,
    }
  }, {
    name: 'max',
    descriptor: {
      type: DataType.INTEGER,
    }
  }],
  outputs: [{
    name: 'value',
    descriptor: {
      type: DataType.INTEGER
    }
  }],
  memory: {
    min: 0,
    max: 10
  },
  elementClass: ['arithmetic'],
  category: 'Math',
  keywords: ['random']
})

export default class RandomInteger extends Node
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
    return "Random Integer"
  }

  get value() {
    let min = parseInt(this.inputs.value('min'));
    let max = parseInt(this.inputs.value('max'));
    return  Math.floor(min + Math.random()*(max-min + 1));
  }
}