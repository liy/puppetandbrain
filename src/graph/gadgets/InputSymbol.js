import DataSymbol from "./DataSymbol";
import ConnectHelper from "../ConnectHelper";

export default class InputSymbol extends DataSymbol
{
  constructor(node, name) {
    super(node, name, 'in');

    // offset the circle a little bit
    this.circlePath.setAttribute('cx', 19);

    this.extendPath.setAttribute('d', `M13,19 h-21`);

    this.offsetX = 32;
  }

  mouseUp(e) {
    if(this.canConnect(ConnectHelper.startSymbol)) {
      this.linkSound.play()
      History.push(Commander.create('CreateDataLink', this.node.id, this.name, 
        ConnectHelper.startSymbol.node.id, ConnectHelper.startSymbol.name).processAndSave())
    }
  }
}