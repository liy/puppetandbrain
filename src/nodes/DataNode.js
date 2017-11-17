import Node from "./Node";

export default class DataNode extends Node
{
  constructor(id) {
    super(id);
    this.id = LookUp.addValue(this, id);
  }
}