export default class ExecutionPin
{
  constructor(name, location='left') {
    this.connectedPin = null

    this.svg = document.getElementById('svg');

    this.dom = document.createElement('div');

    this.spot =  document.createElement('div');
    this.dom.appendChild(this.spot);

    this.label = document.createElement('div');
    this.label.textContent = (name == 'default') ? '' : name;
    this.dom.appendChild(this.label)

    this.dom.style = `float:${location}; clear:${location}; font-size:12px; margin-top:5px`
    this.spot.style = `float:${location}; margin-left:10px; margin-top:6px; margin-right:10px;  width:11px;height:11px; background-image: url(${require('../assets/execution.svg')}); border-radius:7.5px; cursor:pointer`;
    this.label.style = `user-select:none;margin-top:4px;float:${location};cursor:default`
  }

  get position() {
    let offset = this.svg.getBoundingClientRect();
    let rect = this.spot.getBoundingClientRect();
    return {
      x: (rect.left + rect.right)/2 - offset.left,
      y: (rect.top + rect.bottom)/2 - offset.top
    }
  }

  get isConnected() {
    return this.connectedPin != null;
  }
}