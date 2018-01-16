import ElementControlButton from './ElementControlButton';
import DotIcon from '../../assets/dot.svg';
import { svgElement } from '../../utils/utils';
import DataType from '../../data/DataType';

export default class extends ElementControlButton
{
  constructor() {
    super(svgElement(DotIcon,{width:10, height:10}));
  }

  pointerDown(e) {
    History.push(Commander.create('CreateVariable', {
      brain: BrainGraph.brain.id,
      type: DataType.GENERIC,
      name: null,
      data: null,
    }).processAndSave());
  }
}