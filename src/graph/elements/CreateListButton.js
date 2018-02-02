import ElementControlButton from './ElementControlButton';
import ListIcon from '../../assets/list-icon.svg';
import { svgElement } from '../../utils/utils';
import DataType from '../../data/DataType';

export default class extends ElementControlButton
{
  constructor() {
    super(svgElement(ListIcon,{width:17, height:14}));
    
    this.element.setAttribute('data-title', "Create list property");
  }
  
  pointerDown(e) {
    History.push(Commander.create('CreateVariable', {
      brainID: BrainGraph.brain.id,
      name: null,
      data: [],
      descriptor: {
        type: DataType.ARRAY,
      }
    }).processAndSave());
  }
}