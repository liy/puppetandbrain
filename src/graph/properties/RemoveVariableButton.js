import VariableControlButton from './VariableControlButton';
import BinIcon from '../../assets/bin.svg';
import { svgElement } from '../../utils/utils';
import PropertyController from './PropertyController'

export default class extends VariableControlButton
{
  constructor() {
    super(svgElement(BinIcon,{width:18, height:18}));
  }

  pointerDown(e) {
    if(PropertyController.selected.variable.inUse) {
      let confirm = window.confirm('Variable is in use, do you really want to delete the varaible and its getters and setters?');
      if(confirm) {
        History.push(Commander.create('DeleteVariable', PropertyController.selected.variable.id, BrainGraph.brain.id).processAndSave())
      }
    }
    else {
      History.push(Commander.create('DeleteVariable', PropertyController.selected.variable.id, BrainGraph.brain.id).processAndSave())
    }
  }
}