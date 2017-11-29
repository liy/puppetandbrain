require('./DataPin.scss')

import ConnectHelper from './ConnectHelper';

require('../graph/DataPin.scss')

export default class DummyDataPin
{
  constructor(name, location) {
    this.name = name;

    this.container = document.createElement('div');
    this.container.className = 'data-pin';
    this.container.style = `float:${location}; clear:${location};`

    this.icon =  document.createElement('div');
    this.icon.className = 'icon'
    this.container.appendChild(this.icon);
    this.icon.style = `${location}:-22px`

    this.label = document.createElement('span');
    this.label.className = 'label'
    this.label.textContent = name;
    this.container.appendChild(this.label)
    this.label.style = `float:${location}; margin-${location}:10px`
  }
}