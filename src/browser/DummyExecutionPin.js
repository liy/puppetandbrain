require('../graph/ExecutionPin.scss')

/**
 * interaction drawing behaivour is in the out pin to in pin style
 */
export default class DummyExecutionPin
{
  constructor(name, location='left') {
    this.name = name;

    this.container = document.createElement('div');
    this.container.className = 'execution-pin';

    this.icon =  document.createElement('div');
    this.icon.className = 'icon in-disconnected'
    this.container.appendChild(this.icon);
    this.icon.style = `${location}:-26px`

    this.label = document.createElement('div');
    this.label.className = 'label'
    this.label.textContent = (name == 'default') ? '' : name;
    this.container.appendChild(this.label)

    this.label.style = `float:${location}; margin-${location}:10px`
  }
}