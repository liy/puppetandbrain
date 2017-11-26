import DataPin from "./DataPin";
import Command from "../commands/Command";

export default class InputPin extends DataPin
{
  constructor(block, name) {
    super(block, name, 'left');
    this.type = 'input'
    this.pointer = this.node.inputs.get(this.name);

    this.icon.className = 'icon in-disconnected';

    this.path = document.createElementNS('http://www.w3.org/2000/svg','path');
    this.path.setAttribute('stroke', '#a9c4d2');
    this.path.setAttribute('stroke-width', 2);
    this.path.setAttribute('stroke-opacity', 1);
    this.path.setAttribute('fill', 'transparent');

    this.addLocalInputs();
  }

  // TODO: better genertic methods!!
  addLocalInputs(element) {
    // this.element.value = this.pointer.value;
    // if(!this.pointer.isOutputPointer) this.container.appendChild(this.element)
    // // The listener will be removed if element is no longer reachable.
    // this.element.addEventListener('change', (e) => {
    //   this.node.variables[this.name] = e.target.value;
    //   if(this.node.initialState) {
    //     this.node.initialState.variables[this.name] = e.target.value;
    //   }
    // })
  }

  showInput() {
    // if(this.element) {
    //   this.element.style.visibility = 'visible';
    //   this.label.style.visibility = 'hidden'
    // }
  }

  hideInput() {
    // if(this.element) {
      // console.log('!!!')
      // this.label.style.visibility = 'visible';
      // this.element.style.visibility = 'hidden';
    // }
  }

  get isConnected() {
    return this.getOutputPin() != null;
  }

  refresh() {
    if(!this.isConnected) {
      this.icon.className = 'icon in-disconnected';
      if(this.svg.contains(this.path)) this.svg.removeChild(this.path);
      this.element.value = this.pointer.value
      this.container.appendChild(this.element);
      return;
    }

    if(this.element && this.container.contains(this.element)) {
      this.container.removeChild(this.element);
    }

    this.addLocalInputs();

    this.svg.appendChild(this.path);
    this.icon.className = 'icon in-connected';
    this.drawConnection();
  }

  getOutputPin() {
    if(!this.pointer.isOutputPointer) return null;
    return BrainGraph.getBlock(this.pointer.output.node.id).outputPins.get(this.pointer.output.name);
  }

  rightMouseDown(e) {
    super.rightMouseDown(e);
    History.push(Commander.create('RemoveInputDataLink', this.node.id, this.name).process());
  }

  drawConnection() {
    if(!this.pointer.isOutputPointer) return;

    let outputPin = this.getOutputPin();

    let offsetX = -8;
    let dx = (outputPin.position.x-offsetX) - (this.position.x+offsetX);
    let dy = outputPin.position.y - this.position.y;
    let adx = Math.abs(dx);
    let ady = Math.abs(dy);
    let degree = Math.atan2(-dy, -dx)*180/Math.PI;

    // console.log(dx, dy, degree, Math.sqrt(dx*dx+dy*dy) )

    // direct line:
    // 1. degree in range: [-?,?]
    // AND
    // 2. distance ?
    if(Math.abs(degree) < 45 && adx < 50 ) {
      this.path.setAttribute('d', `M${this.position.x},${this.position.y} l${offsetX},0 L${outputPin.position.x-offsetX},${outputPin.position.y} l${offsetX},0`);
    }
    else {
      if(dx >= 0) {
        if(adx > ady) {
          this.path.setAttribute('d', `M${this.position.x},${this.position.y} l${offsetX},0 ${ady/2},${dy/2} ${adx-ady},0 ${ady/2},${dy/2} L${outputPin.position.x-offsetX},${outputPin.position.y} l${offsetX},0`);
        }
        else {
          // dx with sign of dy
          let dxsdy = adx*Math.sign(dy)
          this.path.setAttribute('d', `M${this.position.x},${this.position.y} l${offsetX},0 ${adx/2},${dxsdy/2}, 0,${(ady-adx)*Math.sign(dy)} ${adx/2},${dxsdy/2} L${outputPin.position.x-offsetX},${outputPin.position.y} l${offsetX},0`);
        }
      }
      else {
        if(adx > ady) {
          this.path.setAttribute('d', `M${this.position.x},${this.position.y} l${offsetX},0 ${-ady/2},${dy/2} ${-(adx-ady)},0 L${outputPin.position.x-offsetX},${outputPin.position.y} l${offsetX},0`);
        }
        else {
          let dxsdy = adx*Math.sign(dy)
          this.path.setAttribute('d', `M${this.position.x},${this.position.y} l${offsetX},0 ${dx/2},${dxsdy/2} 0,${(ady-adx)*Math.sign(dy)} L${outputPin.position.x-offsetX},${outputPin.position.y} l${offsetX},0`);
        }
      }
    }
  }

  get position() {
    let offset = this.svg.getBoundingClientRect();
    let rect = this.icon.getBoundingClientRect();
    return {
      x: (rect.left + rect.right)/2 - offset.left - 3,
      y: (rect.top + rect.bottom)/2 - offset.top
    }
  }
}