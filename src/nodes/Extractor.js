import Node from "./Node";
import DataType from "../data/DataType";

NodeTemplate.Extractor = {
  className: 'Extractor',
  enter: {
    enabled: false
  },
  execution: [],
  inputs: [{
    name: 'in',
    type: DataType.MAP
  }],
  outputs: [],
  elementClass: ['utility', 'center-input'],
  category: 'Utilities',
  keywords: ['break']
}

export default class Extractor extends Node
{
  constructor(id) {
    super(id)
  }
}
