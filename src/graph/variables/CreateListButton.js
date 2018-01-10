import VariableControlButton from './VariableControlButton';
import ListIcon from '../../assets/list-icon.svg';
import { svgElement } from '../../utils/utils';
import Variable from '../../data/Variable';
import DataType from '../../data/DataType';

export default class extends VariableControlButton
{
  constructor() {
    super(svgElement(ListIcon,{width:17, height:14}));
  }
  
  pointerDown(e) {
    let v = new Variable();
    v.init({
      brain: BrainGraph.brain.id,
      type: DataType.ARRAY,
      name: null,
      data: []
    })
    BrainGraph.brain.variables.add(v);
  }
}