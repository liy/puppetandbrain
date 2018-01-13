import DataType from "./data/DataType";

window.NodeTemplate = Object.create(null);

const TestNode = {

  enter: {
    name: 'default',
    enabled: true,

    // multiple execution in. Merge the callers field
    callers: [{
      nodeID: 123,
      executionName: 'name'
    },{
      nodeID: 124,
      executionName: 'name'
    }]
  },


  execution: [{
    name: 'out execution name',
    // execution connect to this node id
    nodeID: 123,
  }],


  inputs: [{
    // id of the input(pointer)
    id: 334,

    name: 'A',
    type: DataType.GENERIC,

    // TODO: add data property, which contains input default data.
    data: null,

    output: {
      // rename node to nodeID
      nodeID: 123,
      name: 'output name'
    }
  }],


  outputs: [{
    name: 'value',
    type: DataType.GENERIC,


    connections: [{
      nodeID: 123,
      name: 'input name'
    }, {
      nodeID: 124,
      name: 'input name'
    }]
  }],


  // stores data used by input or potentially used by input
  memory: {
    A: 123
  },

  // visual related
  name: 'Test Block',
  elementClass: ['property', 'getter'],
  category: ['Action', 'Property']
}