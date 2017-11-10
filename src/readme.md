{
  // parse actor first
  actors: {
    lookup: {
      id: {
        class,
        id,
        childActors: [id]
      }
    },
    // use this as the entry to parse the saved data in an order.
    stage: [id, id, id]
  },
  tasks: {
    lookup: {
      id: {
        class,
        id,
        execution: [{name: name, task: id}],
        actor: actor.id
      }
    },
    entries: [id, id, id]
  }
}



AnimationTask {
  inputs: {
    name: <string>
  }
}

DelayTask {
  properties: null,
  inputs: {
    seconds: <number>
  }
}

FunctionTask {
  properties: {
    name: <string>,
  },
  inputs: null
  outputs: [
    <dynamic>
  ]
}

GetLocationTask {
  inputs: {
    target: <number>
  },
  outputs: [
    location
  ]
}

GroupTask {
  properties: {
    tasks: []
  },
  inputs: null,
  outputs: null,
}

MoveTask {
  properties: {
    location: {}
  },
  inputs: {
    location: {}
  }
}

PrintTask {
  properties: {
    text: ''
  },
  inputs: {
    text: ''
  }
}