export default class Pin
{
  constructor(name) {
    this.dom = document.createElement('div');
    this.dom.style = "float:left; clear:left; font-size:12px; margin-top:5px"

    this.spot =  document.createElement('div');
    this.spot.style = "float:left;margin:6px; width:11px;height:11px; background:red; border-radius:7.5px;"
    this.dom.appendChild(this.spot);
    
    this.label = document.createElement('div');
    this.label.style = "margin-top:3px;float:left;"
    this.label.textContent = name
    this.dom.appendChild(this.label)
  }
}