import DataType from "../../data/DataType";
import {Task, Template as ParentTemplate} from '../Task'

NodeTemplate.set({
  ...ParentTemplate,
  className: 'StrokeStyle',
  name: 'Stroke Style',
  inputs: [{
    name: 'width',
    descriptor: {
      type: DataType.DOUBLE,
      gadgetClassName: 'RangeField',
      min:0,
      max:40,
      decimalPlaces:1
    }
  },{
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
    width: 2,
    color: 0x000000,
    opacity: 1,
  },
  category: 'Draw',
  keywords: ['fill color', 'fill']
})

export default class StrokeStyle extends Task
{
  constructor(id, activity) {
    super(id, activity)
  }

  run() {
    super.run();

    Hub.canvasActor.lineStyle.width = this.inputs.value('width')
    Hub.canvasActor.lineStyle.color = this.inputs.value('color')
    Hub.canvasActor.lineStyle.alpha =  this.inputs.value('opacity')

    this.execution.run();
  }

  getGadgetConstructorData(inputName) {
    if(inputName === 'opacity' || inputName === 'width') {
      const input = NodeTemplate.get('StrokeStyle').inputs.find(input => {
        return input.name === inputName
      })

      return {
        ...input.descriptor,
        value: this.memory[inputName],
      }
    }
    return super.getGadgetConstructorData(inputName)
  }
}