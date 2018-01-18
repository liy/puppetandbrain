import PropertyElement from './PropertyElement';
import RotationIcon from '../../assets/rotation-icon.svg';
import { svgElement } from '../../utils/utils';
import ValueField from './ValueField';

export default class extends PropertyElement
{
  constructor(actor) {
    super(actor, {name:'rotation'});

    let svg = svgElement(RotationIcon,{width:18, height:18});
    this.icon.appendChild(svg);

    this.valueField = new ValueField(actor.rotation);
    this.content.appendChild(this.valueField.element);

    this.valueField.on('gadget.state.change', value => {
      actor.rotation = Number(value);
    })
  }

}