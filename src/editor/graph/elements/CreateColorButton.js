import ElementControlButton from './ElementControlButton';
import BucketIcon from '@/assets/paint-bucket.svg';
import { svgElement } from '../../utils/utils';
import DataType from '../../data/DataType';

export default class extends ElementControlButton
{
  constructor() {
    super(svgElement(BucketIcon,{width:18, height:18}));
    this.element.setAttribute('data-title', "Create color property");
  }

  pointerDown(e) {
    History.push(Commander.create('CreateVariable', {
      brainID: BrainGraph.brain.id,
      name: null,
      data: 0xFFFFFF,
      descriptor: {
        type: DataType.COLOR,
      }
    }).processAndSave());
  }
}