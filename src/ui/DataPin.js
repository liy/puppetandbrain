export default class DataPin
{
  constructor(name, type='input') {
    this.name = name;
    this.svg = document.getElementById('svg');

    this.dom = document.createElement('div');

    this.spot =  document.createElement('div');
    this.dom.appendChild(this.spot);

    this.label = document.createElement('div');
    this.label.textContent = name
    this.dom.appendChild(this.label)

    // this.input = document.createElement('input');
    // this.dom.appendChild(this.input)

    if(type == 'input') {
      this.dom.style = "float:left; clear:left; font-size:12px;"
      this.spot.style = "float:left;margin:6px; width:11px;height:11px; background:#6a39c1; border-radius:7.5px; cursor:pointer"
      this.label.style = "user-select:none;margin-top:4px;float:left;cursor:default"
    }
    else {
      this.dom.style = "float:right; clear:right; font-size:12px;"
      this.spot.style = `float:right; margin:6px; width:11px;height:11px; background:#ffc107; border-radius:7.5px; cursor:pointer;`
      this.label.style = "user-select:none;margin-top:4px;float:right;cursor:default"
    }
  }

  get position() {
    let offset = this.svg.getBoundingClientRect();
    let rect = this.spot.getBoundingClientRect();
    return {
      x: (rect.left + rect.right)/2 - offset.left,
      y: (rect.top + rect.bottom)/2 - offset.top
    }
  }
}