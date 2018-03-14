import DataType from "../../data/DataType";
import {Task, Template as ParentTemplate} from '../Task'

const FillStyleTemplate = {
  ...ParentTemplate,
  className: 'FillStyle',
  name: 'Fill Style',
  inputs: [{
    name: 'color',
    descriptor: {
      type: DataType.COLOR,
    }
  }, {
    name: 'opacity',
    descriptor: {
      type: DataType.DOUBLE,
      gadgetClassName: 'RangeField',
      min:0,
      max:1,
      decimalPlaces:2
    }
  }],
  memory: {
    color: 0xFF0000,
    opacity: 1
  },
  category: 'Draw',
  keywords: ['fill color', 'fill']
}

NodeTemplate.scope('CanvasActor', FillStyleTemplate)

export default class FillStyle extends Task
{
  constructor(id, activity) {
    super(id, activity)
  }

  run() {
    super.run();

    console.log(this.inputs.value('color'))

    this.owner.fillStyle(this.inputs.value('color'), this.inputs.value('opacity'))

    this.execution.run();
  }

  getGadgetConstructorData(inputName) {
    if(inputName === 'opacity') {
      const descriptor = FillStyleTemplate.inputs.find(input => {
        return input.name === 'opacity'
      })
      return {
        ...descriptor,
        value: this.memory.opacity,
      }
    }
    console.log(inputName, super.getGadgetConstructorData(inputName))
    return super.getGadgetConstructorData(inputName)
  }
}