import ActionName from '../nodes/ActionName';

// FIXME: find a better way to build this.
// Maybe include the entry in Node static variable?
export default [
  {
    itemName: 'Wait',
    nodePod: {
      className: 'Wait',
      variables: {
        seconds: 1
      }
    }
  },
  {
    itemName: 'Game Start',
    nodePod: {
      className: 'Action',
      actionName: ActionName.GAME_START
    }
  },
  {
    itemName: 'Move',
    nodePod: {
      className: 'Tween'
    }
  },
  {
    itemName: 'Print',
    nodePod: {
      className: 'Trace',
      variables: {
        text: 'Print out a message'
      }
    }
  },
  {
    itemName: 'Animation',
    nodePod: {
      className: 'Animation',
      variables: {
      itemName: 'static',
      }
    }
  },
  {
    itemName: 'Branch',
    nodePod: {
      className: 'Branch',
      variables: {
        condition: true
      }
    }
  },
  {
    itemName: 'Get Position',
    nodePod: {
      className: 'GetPosition',
      name: 'position',
    }
  },
  {
    itemName: 'Get Rotation',
    nodePod: {
      className: 'GetRotation',
      name: 'rotation',
    }
  },

  {
    itemName: '+ Addition',
    nodePod: {
      className: 'Addition',
      variables: {
        A: 1,
        B: 1
      },
    }
  },
  {
    itemName: '/ Divide',
    nodePod: {
      className: 'Divide',
      variables: {
        A: 4,
        B: 2,
      },
    }
  },
  {
    itemName: '* Multiply',
    nodePod: {
      className: 'Multiply',
      variables: {
        A: 2,
        B: 3,
      },
    }
  },
  {
    itemName: '= Equal',
    nodePod: {
      className: 'Equal',
      variables: {
        A: 1,
        B: 1,
      },
    }
  },
  {
    itemName: '<= Less Equal',
    nodePod: {
      className: 'LessEqual',
      variables: {
        A: 1,
        B: 2,
      },
    }
  },
  {
    itemName: '< Less Than',
    nodePod: {
      className: 'LessThan',
      variables: {
        A: 1,
        B: 2,
      },
    }
  },
  {
    itemName: 'Random Number',
    nodePod: {
      className: 'RandomNumber',
    }
  },
  {
    itemName: 'Key Down',
    nodePod: {
      className: 'KeyDown',
      variables: {
        key: 'S'
      }
    }
  },
  {
    itemName: 'Loop',
    nodePod: {
      className: 'Loop',
      variables: {
        limit: 3
      }
    }
  },
  {
    itemName: 'Repeat',
    nodePod: {
      className: 'Repeat',
      variables: {
        times: 3
      }
    }
  },
  {
    itemName: 'Break Position',
    nodePod: {
      className: 'Break',
      outputs: [{
        name: 'x'
      },{
        name: 'y'
      }]
    }
  },
  {
    itemName: 'Make Position',
    nodePod: {
      className: 'MakePosition',
    }
  }
]