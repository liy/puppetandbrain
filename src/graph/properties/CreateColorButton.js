import VariableControlButton from './VariableControlButton';
import BucketIcon from '../../assets/paint-bucket.svg';
import { svgElement } from '../../utils/utils';
import DataType from '../../data/DataType';

export default class extends VariableControlButton
{
  constructor() {
    super(svgElement(BucketIcon,{width:18, height:18}));
  }

  pointerDown(e) {
    History.push(Commander.create('CreateVariable', {
      brain: BrainGraph.brain.id,
      type: DataType.COLOR,
      name: null,
      data: 0xFFFFFF
    }).processAndSave());
  }
}