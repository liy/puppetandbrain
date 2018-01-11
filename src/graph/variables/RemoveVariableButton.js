import VariableControlButton from './VariableControlButton';
import BinIcon from '../../assets/bin.svg';
import { svgElement } from '../../utils/utils';
import VariablePanelController from './VariablePanelController'

export default class extends VariableControlButton
{
  constructor() {
    super(svgElement(BinIcon,{width:18, height:18}));
  }

  pointerDown(e) {
    History.push(Commander.create('DeleteVariable', VariablePanelController.selected.variable.id, BrainGraph.brain.id).processAndSave())
  }
}