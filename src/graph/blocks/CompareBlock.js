import AdaptorBlock from "./AdaptorBlock";

export default class extends AdaptorBlock
{
  constructor() {
    super();
  }

  onSelection(e) {
    super.onSelection(e);
    this.node.operationName = this.selectedItem.operation.name;
  }
}