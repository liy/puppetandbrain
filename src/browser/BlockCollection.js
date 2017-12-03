// FIXME: find a better way to build this.
// Maybe include the entry in Node static variable?
export default [
  {
    name: 'Action',
    category: 'Action',
    pod: {
      className: 'Action',
      actionName: '',
    },
    in: false,
    out: ['default'],
    outputs: [],
    minWidth: 120,
  },
  {
    name: 'Wait',
    category: 'Flow Control',
    pod: {
      className: 'Wait',
      variables: {
        seconds: 1
      }
    },
    in: true,
    out: ['default'],
    outputs: [],
    minWidth: 120,
  },
  {
    name: 'Move',
    category: 'Animation',
    pod: {
      className: 'Tween'
    },
    in: true,
    out: ['default'],
    inputs: ['position', 'duration'],
    outputs: [],
    minWidth: 120,
  },
  {
    name: 'Flip',
    category: 'Animation',
    pod: {
      className: 'Flip',
      variables: {
        direction: 'x'
      }
    },
    in: true,
    out: ['default'],
    outputs: [],
    minWidth: 120,
  },
  {
    name: 'Print',
    category: 'Debug',
    pod: {
      className: 'Trace',
      variables: {
        text: 'Print out a message'
      }
    },
    in: true,
    out: ['default'],
    outputs: [],
    minWidth: 120,
  },
  {
    name: 'Animation',
    category: 'Animation',
    pod: {
      className: 'Animation',
      variables: {
        name: 'static',
      }
    },
    in: true,
    out: ['default'],
    outputs: [],
    minWidth: 120,
  },
  {
    name: 'Play Sound',
    category: 'Animation',
    pod: {
      className: 'PlaySound',
      variables: {
        name: 'sound url',
      }
    },
    in: true,
    out: ['default', 'complete'],
    outputs: ['audio'],
    minWidth: 120,
  },
  {
    name: 'Branch',
    category: 'Flow Control',
    pod: {
      className: 'Branch',
      variables: {
        condition: true
      }
    },
    in: true,
    out: ['true', 'false'],
    outputs: [],
    minWidth: 120,
  },
  {
    name: 'Get Position',
    category: 'Property',
    pod: {
      className: 'GetPosition',
      name: 'position',
    },
    in: false,
    out: [],
    outputs: ['position'],
    minWidth: 100,
  },
  {
    name: 'Get Rotation',
    category: 'Property',
    pod: {
      className: 'GetRotation',
      name: 'rotation',
    },
    in: false,
    out: [],
    outputs: ['rotation'],
    minWidth: 100,
  },

  {
    name: '+ Addition',
    category: 'Math',
    pod: {
      className: 'Addition',
      variables: {
        A: 1,
        B: 1
      },
    },
    in: false,
    out: [],
    outputs: ['value'],
    minWidth: 90,
  },
  {
    name: '/ Divide',
    category: 'Math',
    pod: {
      className: 'Divide',
      variables: {
        A: 4,
        B: 2,
      },
    },
    in: false,
    out: [],
    outputs: ['value'],
    minWidth: 90,
  },
  {
    name: '* Multiply',
    category: 'Math',
    pod: {
      className: 'Multiply',
      variables: {
        A: 2,
        B: 3,
      },
    },
    in: false,
    out: [],
    outputs: ['value'],
    minWidth: 90,
  },
  {
    name: '= Equal',
    category: 'Math',
    pod: {
      className: 'Equal',
      variables: {
        A: 1,
        B: 1,
      },
    },
    in: false,
    out: [],
    outputs: ['value'],
    minWidth: 90,
  },
  {
    name: '<= Less Equal',
    category: 'Math',
    pod: {
      className: 'LessEqual',
      variables: {
        A: 1,
        B: 2,
      },
    },
    in: false,
    out: [],
    outputs: ['value'],
    minWidth: 90,
  },
  {
    name: '< Less Than',
    category: 'Math',
    pod: {
      className: 'LessThan',
      variables: {
        A: 1,
        B: 2,
      },
    },
    in: false,
    out: [],
    outputs: ['value'],
    minWidth: 90,
  },
  {
    name: 'Random Number',
    category: 'Math',
    pod: {
      className: 'RandomNumber',
    },
    in: false,
    out: [],
    outputs: ['value'],
    minWidth: 90,
  },
  {
    name: 'Loop',
    category: 'Flow Control',
    pod: {
      className: 'Loop',
      variables: {
        condition: true
      }
    },
    in: true,
    out: ['body', 'completed'],
    outputs: ['times'],
    minWidth: 120,
  },
  {
    name: 'Repeat',
    category: 'Flow Control',
    pod: {
      className: 'Repeat',
      variables: {
        times: 3
      }
    },
    in: true,
    out: ['body', 'completed'],
    outputs: ['index'],
    minWidth: 120,
  },
  {
    name: 'Break Position',
    category: 'Utilities',
    pod: {
      className: 'Break',
      outputs: [{
        name: 'x'
      },{
        name: 'y'
      }]
    },
    in: false,
    out: [],
    outputs: ['x', 'y'],
    minWidth: 100,
  },
  {
    name: 'Make Position',
    category: 'Utilities',
    pod: {
      className: 'MakePosition',
      variables: {
        x: 0,
        y: 0,
      }
    },
    in: false,
    out: [],
    outputs: ['position'],
  },


  // listener blocks!
  {
    name: 'Game Start',
    category: 'Event',
    pod: {
      className: 'GameStart',
    },
    in: false,
    out: ['default'],
    outputs: [],
    minWidth: 100,
  },
  {
    name: 'Game Tick',
    category: 'Event',
    pod: {
      className: 'Ticker',
    },
    in: false,
    out: ['default'],
    outputs: [],
    minWidth: 100,
  },
  {
    name: 'Key Down',
    category: 'Event',
    pod: {
      className: 'KeyDown',
      variables: {
        key: 'S'
      }
    },
    in: false,
    out: ['default'],
    outputs: [],
    minWidth: 100,
  },
  {
    name: 'Key Up',
    category: 'Event',
    pod: {
      className: 'KeyUp',
      variables: {
        key: 'S'
      }
    },
    in: false,
    out: ['default'],
    outputs: [],
    minWidth: 100,
  },
  {
    name: 'Touch Down',
    category: 'Event',
    pod: {
      className: 'PointerDown',
    },
    in: false,
    out: ['default'],
    outputs: [],
    minWidth: 100,
  },
  {
    name: 'Touch Move',
    category: 'Event',
    pod: {
      className: 'PointerMove',
    },
    in: false,
    out: ['default'],
    outputs: [],
    minWidth: 100,
  },
  {
    name: 'Touch Hover',
    category: 'Event',
    pod: {
      className: 'PointerOver',
    },
    in: false,
    out: ['default'],
    outputs: [],
    minWidth: 100,
  },
  {
    name: 'Touch Unhover',
    category: 'Event',
    pod: {
      className: 'PointerOut',
    },
    in: false,
    out: ['default'],
    outputs: [],
    minWidth: 100,
  },
  {
    name: 'Touch Up',
    category: 'Event',
    pod: {
      className: 'PointerUp',
    },
    in: false,
    out: ['default'],
    outputs: [],
    minWidth: 100,
  },
  {
    name: 'Switch Down',
    category: 'Event',
    pod: {
      className: 'SwitchDown',
    },
    in: false,
    out: ['default'],
    outputs: [],
    minWidth: 100,
  },
  {
    name: 'Switch Up',
    category: 'Event',
    pod: {
      className: 'SwitchUp',
    },
    in: false,
    out: ['default'],
    outputs: [],
    minWidth: 100,
  },
  {
    name: 'Animation Event',
    category: 'Event',
    pod: {
      className: 'AnimationEvent',
    },
    in: false,
    out: ['default'],
    outputs: ['event name'],
    minWidth: 100,
  },
]