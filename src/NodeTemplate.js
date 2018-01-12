import DataType from "./data/DataType";

window.NodeTemplate = Object.create(null);

const TestNode = {

  ins: [{
    name: 'default',

    // FUTURE: multiple execution in. Merge the callers field
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
    name: 'default',

    // FUTURE
    link: {
      node: 123,
      name: 'name'
    }
  }],


  inputs: [{
    // id of the input(pointer)
    id: 334,

    // TODO: rename to name
    name: 'A',
    type: DataType.GENERIC,

    // TODO: add value property, which contains input default value.

    // TODO: rename output to link
    link: {
      node: 123,
      name: 'output name'
    }
  }],


  outputs: [{
    name: 'value',
    type: DataType.GENERIC,

    // FUTURE: connection to a node
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

  // visual related
  name: 'Test Block',
  elementClass: ['property', 'getter'],
  category: ['Action', 'Property']
}