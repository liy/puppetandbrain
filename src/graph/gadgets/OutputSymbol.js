import DataSymbol from "./DataSymbol";

export default class OutputSymbol extends DataSymbol
{
  constructor(node, name) {
    super(node, name, 'out');

    // offset the circle a little bit
    this.circlePath.setAttribute('cx', 15);

    this.circlePath.setAttribute('fill', '#98C6DE');
    this.circlePath.setAttribute('stroke', 'none');

    this.extendPath.setAttribute('d', `M15,19 h19`);

    this.offsetX = -32;
  }

  showExtendPath() {
    this.svg.appendChild(this.extendPath);
  }

  hideExtendPath() {
    this.svg.removeChild(this.extendPath);
  }

  mouseUp(e) {
    if(this.canConnect(ConnectHelper.startSymbol)) {
      this.linkSound.play()
      History.push(Commander.create('CreateDataLink', ConnectHelper.startSymbol.node.id, ConnectHelper.startSymbol.name, this.node.id, this.name).processAndSave());
    }
  }
}