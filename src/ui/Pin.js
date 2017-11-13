export default class Pin
{
  constructor(name, location='left') {
    this.dom = document.createElement('div');

    this.spot =  document.createElement('div');
    this.dom.appendChild(this.spot);

    this.label = document.createElement('div');
    this.label.textContent = name
    this.dom.appendChild(this.label)

    this.dom.style = `float:${location}; clear:${location}; font-size:12px; margin-top:5px`
    this.spot.style = `float:${location};margin:6px; width:11px;height:11px; background:${location=='left' ? '#8BC34A' : '#ffc107'}; border-radius:7.5px; cursor:pointer`
    this.label.style = `user-select:none;margin-top:4px;float:${location};cursor:default`
  }
}