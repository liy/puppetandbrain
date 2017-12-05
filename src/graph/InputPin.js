import DataPin from "./DataPin";
import Command from "../commands/Command";

export default class InputPin extends DataPin
{
  constructor(block, name) {
    super(block, name, 'left');
    this.pointer = this.node.inputs.get(this.name);

    this.icon.className = 'icon';

    this.path = document.createElementNS('http://www.w3.org/2000/svg','path');
    this.path.setAttribute('stroke', '#98c6de');
    this.path.setAttribute('stroke-width', 2);
    this.path.setAttribute('stroke-opacity', 1);
    this.path.setAttribute('fill', 'transparent');

    // default input element
    this.inputElement = document.createElement('input');
    if(this.pointer.value || this.pointer.value == 0) {
      this.inputElement.value = this.pointer.value
    }
    else {
      this.inputElement.value = ''
    }
    this.container.appendChild(this.inputElement);
    this.inputElement.addEventListener('change', e => {
      this.node.variables[this.name] = e.target.value;
      if(this.node.initialState) {
        this.node.initialState.variables[this.name] = e.target.value;
      }
      this.updateInputElement();
    })
    this.updateInputElement();
  }

  setInputElement(element) {
    this.container.removeChild(this.inputElement);

    this.inputElement = element;
    this.container.appendChild(this.inputElement);
  }

  updateInputElement() {
    if(this.block.isHover) {
      if(this.pointer.isOutputPointer) {
        this.inputElement.style.visibility = 'hidden';
        this.label.style.visibility = 'visible'
      }
      else {
        this.inputElement.style.visibility = 'visible';
        this.label.style.visibility = 'hidden'
      }
    }
    else {
      this.inputElement.style.visibility = 'hidden';
      this.label.style.visibility = 'visible'
    }

    // update icon
    if(!this.isConnected) {
      if(this.pointer.value || this.pointer.value == 0) {
        this.icon.className = 'icon in-local';
      }
      else {
        this.icon.className = 'icon in-disconnected';
      }
    }
    else {
      this.icon.className = 'icon in-connected';
    }
  }

  blockover() {
    if(this.pointer.isOutputPointer) return;
    
    if(this.inputElement) {
      this.inputElement.style.visibility = 'visible';
      this.label.style.visibility = 'hidden'
    }
  }

  blockout() {
    this.label.style.visibility = 'visible';
    if(this.inputElement) {
      this.inputElement.style.visibility = 'hidden';
    }
  }

  get isConnected() {
    return this.pointer.isConnected;
  }

  // FIXME: fix the drawing and refreshing! They are a messsssss
  refresh() {
    this.updateInputElement();

    if(!this.isConnected) {
      if(this.svg.contains(this.path)) this.svg.removeChild(this.path);
    }
    else {
      this.svg.appendChild(this.path);
      this.drawConnection();
    }
  }

  getOutputPin() {
    if(!this.pointer.isOutputPointer) return null;
    return BrainGraph.getBlock(this.pointer.output.node.id).outputPins.get(this.pointer.output.name);
  }

  onContextMenu(e) {
    super.onContextMenu(e);
    History.push(Commander.create('RemoveInputDataLink', this.node.id, this.name).processAndSave());
  }

  drawConnection() {
    if(!this.pointer.isOutputPointer) return;

    let outputPin = this.getOutputPin();

    // Note the brain graph zoom scale!!!
    let offsetX = -8 * BrainGraph.scale;
    let dx = (outputPin.position.x-offsetX) - (this.position.x+offsetX);
    let dy = outputPin.position.y - this.position.y;
    let adx = Math.abs(dx);
    let ady = Math.abs(dy);
    let degree = Math.atan2(-dy, -dx)*180/Math.PI;

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
      x: (rect.left + rect.right)/2 - offset.left - 4*BrainGraph.scale,
      y: (rect.top + rect.bottom)/2 - offset.top
    }
  }
}