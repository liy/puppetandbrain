export default class Pin
{
  constructor(name, type='input') {
    this.svg = document.getElementById('svg');
    this.offset = svg.getBoundingClientRect();

    this.dom = document.createElement('div');

    this.spot =  document.createElement('div');
    this.dom.appendChild(this.spot);

    this.label = document.createElement('div');
    this.label.textContent = name
    this.dom.appendChild(this.label)

    if(type == 'input') {
      this.dom.style = "float:left; clear:left; font-size:12px;"
      this.spot.style = "float:left;margin:6px; width:11px;height:11px; background:#8BC34A; border-radius:7.5px; cursor:pointer"
      this.label.style = "user-select:none;margin-top:4px;float:left;cursor:default"
    }
    else if(type == 'right') {
      this.dom.style = "float:right; clear:right; font-size:12px;"
      this.spot.style = `float:right; margin:6px; width:11px;height:11px; background:#ffc107; border-radius:7.5px; cursor:pointer;`
      this.label.style = "user-select:none;margin-top:4px;float:right;cursor:default"
    }
  }

  get position() {
    let rect = this.spot.getBoundingClientRect();
    console.log(this.spot)
    return {
      x: (rect.left + rect.right)/2 - this.offset.left,
      y: (rect.top + rect.bottom)/2 - this.offset.top
    }
  }
}