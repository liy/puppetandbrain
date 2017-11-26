// FIXME: find a better way to build this.
// Maybe include the entry in Node static variable?
export default [
  {
    itemName: 'Action',
    nodePod: {
      className: 'Action',
      actionName: ''
    }
  },
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
  },


  // listener blocks!
  {
    itemName: 'Game Start',
    nodePod: {
      className: 'GameStart',
    }
  },
  {
    itemName: 'Game Tick',
    nodePod: {
      className: 'Ticker',
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
    itemName: 'Key Up',
    nodePod: {
      className: 'KeyUp',
      variables: {
        key: 'S'
      }
    }
  },
  {
    itemName: 'Touch Down',
    nodePod: {
      className: 'PointerDown',
    }
  },
  {
    itemName: 'Touch Move',
    nodePod: {
      className: 'PointerMove',
    }
  },
  {
    itemName: 'Touch Hover',
    nodePod: {
      className: 'PointerOver',
    }
  },
  {
    itemName: 'Touch Unhover',
    nodePod: {
      className: 'PointerOut',
    }
  },
  {
    itemName: 'Touch Over',
    nodePod: {
      className: 'PointerOver',
    }
  },
  {
    itemName: 'Touch Up',
    nodePod: {
      className: 'PointerUp',
    }
  },
  {
    itemName: 'Switch Down',
    nodePod: {
      className: 'SwitchDown',
    }
  },
  {
    itemName: 'Switch Up',
    nodePod: {
      className: 'SwitchUp',
    }
  },
]