import './PropertyElement.scss'
import BaseElement from './BaseElement'

export default class extends BaseElement
{
  constructor(actor, propertyName='property') {
    super();

    this.actor = actor;

    this.element.classList.add('property-element')

    this.label = document.createElement('span');
    this.label.className = 'property-name';
    this.label.textContent = propertyName;
    this.content.appendChild(this.label);
  }
}