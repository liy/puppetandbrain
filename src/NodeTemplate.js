window.NodeTemplate = Object.create(null);

const test = {
  
  ins: [{
    name: 'default',

    // future changes: multiple execution in. Merge the callers field
    links: [{
      node: 123,
      name: 'name'
    },{
      node: 124,
      name: 'name'
    }]
  }],

  // TODO: rename to outs
  execution: [{
    // TODO: rename to name
    executionName: 'default',

    // future changes
    link: {
      node: 123,
      name: 'name'
    }
  }],
  inputs: [{
    // id: id of the input(pointer)
    // TODO: rename to name
    inputName: 'A',
    type: DataType.GENERIC,
    // TODO: add value property, which contains input default value.

    // future changes: connection to a node
    link: {
      node: 123,
      name: 'output name'
    }
  }],
  outputs: [{
    name: 'value',
    type: DataType.GENERIC,

    links: [{
      node: 123,
      name: 'input name'
    }, {
      node: 124,
      name: 'input name'
    }]
  }],

  // TODO: rename to property, property of the node.
  // An authoring time variable for the node only.
  variables: {
    A: 123
  },

  name: 'Test Block',
  elementClass: ['property', 'getter'],
  category: ['Action', 'Property']
}