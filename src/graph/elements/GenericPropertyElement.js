import PropertyElement from './PropertyElement';
import DotIcon from '../../assets/dot.svg';
import { svgElement } from '../../utils/utils';
import ValueField from '../gadgets/ValueField';

export default class extends PropertyElement
{
  constructor(actor, propertyName) {
    super(actor, propertyName);

    let svg = svgElement(DotIcon,{width:12, height:12});
    this.svg.style.setProperty('--fill', '#d1bdff');
    this.icon.appendChild(svg);

    this.valueField = new ValueField(actor[propertyName]);
    this.content.appendChild(this.valueField.element);
    this.valueField.icon.style.display = 'none';

    this.valueField.on('gadget.state.change', value => {
      actor[propertyName] = value;
    })
  }

}