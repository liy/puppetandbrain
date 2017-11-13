export default class Pin
{
  constructor(name) {
    this.dom = document.createElement('div');
    this.dom.style = "float:left; clear:left; font-size:12px; margin-top:5px"

    this.spot =  document.createElement('div');
    this.spot.style = "float:left;margin:6px; width:11px;height:11px; background:#8BC34A; border-radius:7.5px; cursor:pointer"
    this.dom.appendChild(this.spot);
    
    this.label = document.createElement('div');
    this.label.style = "user-select:none;margin-top:4px;float:left;cursor:default"
    this.label.textContent = name
    this.dom.appendChild(this.label)
  }
}