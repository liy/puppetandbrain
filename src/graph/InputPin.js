import DataPin from "./DataPin";

export default class InputPin extends DataPin
{
  constructor(block, name) {
    super(block, name, 'left');
    this.type = 'input'

    this.icon.className = 'icon in-disconnected';

    this.path = document.createElementNS('http://www.w3.org/2000/svg','path');
    this.path.setAttribute('stroke', '#a9c4d2');
    this.path.setAttribute('stroke-width', 2);
    this.path.setAttribute('stroke-opacity', 1);
    this.path.setAttribute('fill', 'transparent');

    this.addLocalInputs();
  }

  getPointer() {
    return this.node.inputs.get(this.name);
  }

  // TODO: better genertic methods!!
  addLocalInputs() {
    let pointer = this.getPointer();
    this.inputField = document.createElement('input');
    this.inputField.value = pointer.value;
    if(pointer.isLocalPointer) this.container.appendChild(this.inputField)
    // The listener will be removed if inputField is no longer reachable.
    this.inputField.addEventListener('change', (e) => {
      this.node.variables[this.name] = e.target.value;
      if(this.node.initialState) {
        this.node.initialState.variables[this.name] = e.target.value;
      }
    })
  }

  get isConnected() {
    return this.getOutputPin() != null;
  }

  refresh() {
    if(!this.isConnected) {
      this.icon.className = 'icon in-disconnected';
      if(this.svg.contains(this.path)) this.svg.removeChild(this.path);
      this.inputField.value = this.getPointer().value
      this.container.appendChild(this.inputField);
      return;
    }

    if(this.inputField && this.container.contains(this.inputField)) {
      this.container.removeChild(this.inputField);
    }

    this.addLocalInputs();

    this.svg.appendChild(this.path);
    this.icon.className = 'icon in-connected';
    this.drawConnection();
  }

  getOutputPin() {
    let pointer = this.getPointer();

    if(pointer.isLocalPointer) return null;
    return this.graph.getBlock(pointer.outputNode.id).outputPins.get(pointer.outputName);
  }

  removeConnections(e) {
    super.removeConnections(e);
    let outPin = this.getOutputPin();
    this.graph.brain.disconnectVariable(this.getPointer());
    this.refresh();
    if(outPin) outPin.refresh();
  }

  drawConnection() {
    let pointer = this.getPointer();
    if(pointer.isLocalPointer) return;

    let outputPin = this.getOutputPin();

    let offsetX = -20;
    let dx = (outputPin.position.x-offsetX) - (this.position.x+offsetX);
    let dy = outputPin.position.y - this.position.y;
    let adx = Math.abs(dx);
    let ady = Math.abs(dy);
    let degree = Math.atan2(dy, dx)*180/Math.PI;

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
}