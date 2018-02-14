import Node from "./Node";
import DataType from '../data/DataType';

NodeTemplate.OnlineImage = {
  className: 'OnlineImage',
  name: 'Internet Image',
  inputs: [{
    name: 'url',
    descriptor: {
      type: DataType.STRING, 
    }
  }],
  outputs: [{
    name: 'image',
    descriptor: {
      type: DataType.IMAGE
    }
  }],
  elementClass: ['utility', 'center-input', 'center-output'],
  category: 'Utilities'
}

export default class OnlineImage extends Node
{
  constructor(id) {
    super(id)
  }

  init(pod) {
    super.init(pod);

    this.outputs.assignProperty('image', {
      get: () => {
        const url = this.inputs.value('url');
        return {
          path: url,
          url 
        }
      }
    });
  }
}
