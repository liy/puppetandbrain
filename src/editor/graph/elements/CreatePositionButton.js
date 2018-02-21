import ElementControlButton from './ElementControlButton';
import PositionIcon from '@/assets/position-icon.svg';
import { svgElement } from '../../utils/utils';
import DataType from '../../data/DataType';

export default class extends ElementControlButton
{
  constructor() {
    super(svgElement(PositionIcon,{width:10, height:16}));
    this.element.setAttribute('data-title', "Create position property");
  }

  pointerDown(e) {
    History.push(Commander.create('CreateVariable', {
      brainID: BrainGraph.brain.id,
      name: null,
      data: {
        x: 0,
        y: 0.
      },
      descriptor: {
        type: DataType.VEC2,
      }
    }).processAndSave());
  }
}