import ElementControlButton from './ElementControlButton';
import BooleanIcon from '@/assets/boolean-icon.svg';
import { svgElement } from '@/utils/utils';
import DataType from '../../data/DataType';

export default class extends ElementControlButton
{
  constructor() {
    super(svgElement(BooleanIcon,{width:15, height:10}));
    this.element.setAttribute('data-title', "Create boolean property");
  }

  pointerDown(e) {
    History.push(Commander.create('CreateVariable', {
      brainID: BrainGraph.brain.id,
      name: null,
      data: true,
      descriptor: {
        type: DataType.BOOLEAN,
      }
    }).processAndSave());
  }
}