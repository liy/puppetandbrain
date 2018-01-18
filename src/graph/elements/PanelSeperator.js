import './PanelSeperator.scss'
import SeperatorIcon from '../../assets/panel-seperator.svg';
import { svgElement } from '../../utils/utils';

export default class
{
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'panel-seperator';
    
    this.element.append(svgElement(SeperatorIcon, {width:30, height:4}));
  }
}