import ElementControlButton from './ElementControlButton';
import MapIcon from '@/assets/dictionary-icon.svg';
import { svgElement } from '@/utils/utils';
import DataType from '../../data/DataType';

export default class extends ElementControlButton
{
  constructor() {
    super(svgElement(MapIcon,{width:15, height:15}));
    this.element.setAttribute('data-title', "Create map property");
  }

  pointerDown(e) {
    ActivityManager.history.push(Commander.create('CreateVariable', {
      brainID: BrainGraph.brain.id,
      name: null,
      data: {},
      descriptor: {
        type: DataType.MAP,
      }
    }).processAndSave());
  }
}