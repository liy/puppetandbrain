import './PropertyElement.scss'
import BaseElement from './BaseElement'
import IconStore from '../../ui/IconStore';

export default class extends BaseElement
{
  constructor(actor, propertyName, descriptor) {
    super(IconStore.get(descriptor.iconID));

    this.propertyName = propertyName;
    this.descriptor = descriptor;
    this.actor = actor;

    this.element.classList.add('property-element')

    this.label = document.createElement('span');
    this.label.className = 'property-name';
    this.label.textContent = descriptor.friendlyName || propertyName;
    this.content.appendChild(this.label);
  }

  get name() {
    return this.label.textContent;
  }
}