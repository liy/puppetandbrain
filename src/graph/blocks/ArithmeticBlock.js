import AdaptorBlock from "./AdaptorBlock";

export default class extends AdaptorBlock
{
  constructor() {
    super();
  }

  init(node) {
    super.init(node);

    let operationNames = NodeTemplate[node.className].operationNames;
    Object.keys(operationNames).forEach(name => {
      this.addSelection(name, operationNames[name]);
    })
  }

  onEntryClick(e) {
    super.onEntryClick(e);
    let entryName = e.currentTarget.textContent;
    let nodeClassName = this.selections.get(entryName);

    this.node.destroy();

    this.clear();

    let node = NodeFactory.create(nodeClassName, this.node.id);
    node.init({
      ...NodeTemplate[nodeClassName],
      ownerID: BrainGraph.brain.owner.id,
      x:  this.node.x,
      y:  this.node.y
    })

    this.body.element.removeEventListener('mousedown', this.dragStart);
    this.body.element.removeEventListener('touchstart', this.touchDragStart);
    super.init(node);
  }
}