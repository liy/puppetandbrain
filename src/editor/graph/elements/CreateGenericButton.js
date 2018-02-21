import ElementControlButton from './ElementControlButton';
import DotIcon from '@/assets/dot.svg';
import { svgElement } from '../../utils/utils';
import DataType from '../../data/DataType';

export default class extends ElementControlButton
{
  constructor() {
    super(svgElement(DotIcon,{width:10, height:10}));
    this.element.setAttribute('data-title', "Create generic property");
    this.element.setAttribute('data-title-position', "right");
  }

  pointerDown(e) {
    History.push(Commander.create('CreateVariable', {
      brainID: BrainGraph.brain.id,
      name: null,
      data: null,
      descriptor: {
        type: DataType.GENERIC,
      }
    }).processAndSave());
  }
}