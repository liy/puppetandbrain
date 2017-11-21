import * as ns from './'

// TODO: allow other name mapping? e.g, Print for trace

window.NodeFactory = {
  create: function(className, id) {
    return new ns[className]();
  },

  getNodePods: function() {
    return {
      'Wait': {
        className: 'Wait',
        variables: {
          seconds: 1
        }
      },
      'Action': {
        className: 'Action',
        actionName: 'Play Action'
      },
      'Move': {
        className: 'Tween',
      },
      'Print': {
        className: 'Trace',
        variables: {
          text: 'Print out a message'
        }
      },
      'Animation': {
        className: 'Animation',
        variables: {
          name: 'static'
        }
      },
      // only show perform if there are avaiable actions
      // 'Perform': {
      //   'Perform'
      // },
      'Branch': {
        className: 'Branch',
      },
      'Get Position': {
        className: 'Property',
        name: 'position',
      },
      'Get Rotation': {
        className: 'Property',
        name: 'rotation',
      },

      'Add': {
        className: 'Add',
        variables: {
          A: 1,
          B: 1
        }
      },
      'Divide': {
        className: 'Divide',
        variables: {
          A: 4,
          B: 2,
        }
      },
      'Multiply': {
        className: 'Multiply',
        variables: {
          A: 2,
          B: 3,
        }
      },
      'Equal': {
        className: 'Equal',
        variables: {
          A: 1,
          B: 1,
        }
      },
      'Less Equal': {
        className: 'LessEqual',
        variables: {
          A: 1,
          B: 2,
        }
      },
      'Less Than': {
        className: 'LessThan',
        variables: {
          A: 1,
          B: 2,
        }
      },
      'Random Number': {
        className: 'RandomNumber'
      },
      'Key Down': {
        className: 'KeyDown',
        variables: {
          key: 'S'
        }
      },
      'Loop': {
        className: 'Loop',
        variables: {
          times: 5
        }
      }
    }
  }
}