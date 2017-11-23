import * as ns from './'

// TODO: allow other name mapping? e.g, Print for trace

window.NodeFactory = {
  create: function(className, id) {
    return new ns[className](id);
  },

  getNodePods: function() {
    return {
      'Wait': {
        className: 'Wait',
        variables: {
          seconds: 1
        },
        inputs:[{
          inputName: 'seconds'
        }],
        outputs:[]
      },
      'Action': {
        className: 'Action',
        actionName: 'Play Action',
        inputs: [],
        outputs: []
      },
      'Move': {
        className: 'Tween',
        inputs: [{
          inputName: 'duration',
        },{
          inputName: 'position',
        }],
        outputs: []
      },
      'Print': {
        className: 'Trace',
        variables: {
          text: 'Print out a message'
        },
        inputs: [{
          inputName: 'text',
        }],
        outputs: []
      },
      'Animation': {
        className: 'Animation',
        variables: {
          name: 'static'
        },
        inputs: [{
          inputName: 'name',
        }],
        outputs: []
      },
      // only show perform if there are avaiable actions
      // 'Perform': {
      //   'Perform'
      // },
      'Branch': {
        className: 'Branch',
        variables: {
          condition: true
        },
        inputs: [{
          inputName: 'condition',
        }],
        outputs: [],
      },
      'Get Position': {
        className: 'Property',
        name: 'position',
        inputs: [{
          inputName: 'target',
        }],
        outputs: [{
          name: 'position'
        }],
      },
      'Get Rotation': {
        className: 'Property',
        name: 'rotation',
        inputs: [{
          inputName: 'target',
        }],
        outputs: [{
          name: 'rotation'
        }],
      },

      'Add': {
        className: 'Add',
        variables: {
          A: 1,
          B: 1
        },
        inputs: [{
          inputName: 'A',
        }, {
          inputName: 'B'
        }],
        outputs: [{
          name: 'value'
        }],
      },
      'Divide': {
        className: 'Divide',
        variables: {
          A: 4,
          B: 2,
        },
        inputs: [{
          inputName: 'A',
        }, {
          inputName: 'B'
        }],
        outputs: [{
          name: 'value'
        }],
      },
      'Multiply': {
        className: 'Multiply',
        variables: {
          A: 2,
          B: 3,
        },
        inputs: [{
          inputName: 'A',
        }, {
          inputName: 'B'
        }],
        outputs: [{
          name: 'value'
        }],
      },
      'Equal': {
        className: 'Equal',
        variables: {
          A: 1,
          B: 1,
        },
        inputs: [{
          inputName: 'A',
        }, {
          inputName: 'B'
        }],
        outputs: [{
          name: 'value'
        }],
      },
      'Less Equal': {
        className: 'LessEqual',
        variables: {
          A: 1,
          B: 2,
        },
        inputs: [{
          inputName: 'A',
        }, {
          inputName: 'B'
        }],
        outputs: [{
          name: 'value'
        }],
      },
      'Less Than': {
        className: 'LessThan',
        variables: {
          A: 1,
          B: 2,
        },
        inputs: [{
          inputName: 'A',
        }, {
          inputName: 'B'
        }],
        outputs: [{
          name: 'value'
        }],
      },
      'Random Number': {
        className: 'RandomNumber',
        inputs: [],
        outputs: [{
          name: 'value'
        }],
      },
      'Key Down': {
        className: 'KeyDown',
        variables: {
          key: 'S'
        },
        inputs: [{
          inputName: 'key'
        }],
        outputs: [],
      },
      'Loop': {
        className: 'Loop',
        variables: {
          limit: 3
        },
        inputs: [{
          inputName: 'limit',
        }],
        outputs: [{
          name: 'index'
        }],
      },
      'Repeat': {
        className: 'Repeat',
        variables: {
          times: 3
        },
        inputs: [{
          inputName: 'times',
        }],
        outputs: [{
          name: 'index'
        }],
      }
    }
  }
}