export default class ExecutionPin
{
  constructor(name, location='left') {
    this.dom = document.createElement('div');

    this.spot =  document.createElement('div');
    this.dom.appendChild(this.spot);

    this.label = document.createElement('div');
    this.label.textContent = name
    this.dom.appendChild(this.label)

    this.dom.style = "float:right; clear:right; font-size:12px; margin-top:5px"
    this.spot.style = `float:right;margin:6px; width:11px;height:11px; background-image: url(${require('../assets/execution.svg')}); border-radius:7.5px; cursor:pointer`;
    this.label.style = "user-select:none;margin-top:4px;float:right;cursor:default"
  }
}