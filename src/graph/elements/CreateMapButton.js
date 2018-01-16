import ElementControlButton from './ElementControlButton';
import MapIcon from '../../assets/dictionary-icon.svg';
import { svgElement } from '../../utils/utils';
import DataType from '../../data/DataType';

export default class extends ElementControlButton
{
  constructor() {
    super(svgElement(MapIcon,{width:15, height:15}));
  }

  pointerDown(e) {
    History.push(Commander.create('CreateVariable', {
      brain: BrainGraph.brain.id,
      type: DataType.MAP,
      name: null,
      data: {}
    }).processAndSave());
  }
}