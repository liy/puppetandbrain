import VariableControlButton from './VariableControlButton';
import MapIcon from '../../assets/dictionary-icon.svg';
import { svgElement } from '../../utils/utils';
import DataType from '../../data/DataType';
import Variable from '../../data/Variable';
import ArrayMap from '../../utils/ArrayMap';

export default class extends VariableControlButton
{
  constructor() {
    super(svgElement(MapIcon,{width:15, height:15}));
  }

  pointerDown(e) {
    let v = new Variable();
    v.init({
      brain: BrainGraph.brain.id,
      type: DataType.MAP,
      name: null,
      data: new ArrayMap()
    })
    BrainGraph.brain.variables.add(v);
  }
}