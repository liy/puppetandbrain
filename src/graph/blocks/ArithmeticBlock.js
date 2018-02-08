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
    this.node.operationName = e.currentTarget.textContent
  }
}