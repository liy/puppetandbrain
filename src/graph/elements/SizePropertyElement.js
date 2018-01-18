import PropertyElement from './PropertyElement';
import SizeIcon from '../../assets/size-icon.svg';
import { svgElement } from '../../utils/utils';
import ValueField from './ValueField';

export default class extends PropertyElement
{
  constructor(actor) {
    super(actor, {name:'size'});

    let svg = svgElement(SizeIcon,{width:18, height:18});
    this.icon.appendChild(svg);

    this.valueField = new ValueField(actor.scale.x);
    this.content.appendChild(this.valueField.element);

    this.valueField.on('gadget.state.change', value => {
      actor.scale.x = actor.scale.y = value;
    })
  }

}