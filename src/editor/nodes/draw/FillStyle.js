import DataType from "../../data/DataType";
import {Task, Template as ParentTemplate} from '../Task'

NodeTemplate.set({
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
    color: 0xFFFFFF,
    opacity: 1
  },
  category: 'Draw',
  keywords: ['fill color', 'fill']
})

export default class FillStyle extends Task
{
  constructor(id, activity) {
    super(id, activity)
  }

  run() {
    super.run();

    Hub.canvasActor.fillStyle.color = this.inputs.value('color')
    Hub.canvasActor.fillStyle.alpha =  this.inputs.value('opacity')

    this.execution.run();
  }

  getGadgetConstructorData(inputName) {
    if(inputName === 'opacity') {
      const input = NodeTemplate.get("FillStyle").inputs.find(input => {
        return input.name === 'opacity'
      })
      return {
        ...input.descriptor,
        value: this.memory.opacity,
      }
    }
    return super.getGadgetConstructorData(inputName)
  }
}