import VariableControlButton from './VariableControlButton';
import BinIcon from '../../assets/bin.svg';
import { svgElement } from '../../utils/utils';
import PanelController from './PanelController'

export default class extends VariableControlButton
{
  constructor() {
    super(svgElement(BinIcon,{width:18, height:18}));
  }

  pointerDown(e) {
    BrainGraph.brain.variables.remove(PanelController.selected.data);
  }
}