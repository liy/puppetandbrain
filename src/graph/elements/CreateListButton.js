import ElementControlButton from './ElementControlButton';
import ListIcon from '../../assets/list-icon.svg';
import { svgElement } from '../../utils/utils';
import DataType from '../../data/DataType';

export default class extends ElementControlButton
{
  constructor() {
    super(svgElement(ListIcon,{width:17, height:14}));
  }
  
  pointerDown(e) {
    History.push(Commander.create('CreateVariable', {
      brain: BrainGraph.brain.id,
      type: DataType.ARRAY,
      name: null,
      data: []
    }).processAndSave());
  }
}