import ElementControlButton from './ElementControlButton';
import BinIcon from '../../assets/bin.svg';
import { svgElement } from '../../utils/utils';
import ElementController from './ElementController'

export default class extends ElementControlButton
{
  constructor() {
    super(svgElement(BinIcon,{width:18, height:18}));
  }

  pointerDown(e) {
    if(ElementController.selected.variable.inUse) {
      let confirm = window.confirm('Variable is in use, do you really want to delete the varaible and its getters and setters?');
      if(confirm) {
        History.push(Commander.create('DeleteVariable', ElementController.selected.variable.id, BrainGraph.brain.id).processAndSave())
      }
    }
    else {
      History.push(Commander.create('DeleteVariable', ElementController.selected.variable.id, BrainGraph.brain.id).processAndSave())
    }
  }
}