{
  // parse actor first
  actors: {
    lookup: {
      id: {
        class,
        childActors: [],
        ...
      }
    },
    // use this as the entry to parse the saved data in an order.
    stage: [id, id, id]
  },
  tasks: {
    lookup: {
      id: {
        class,
        ...
      }
    }
  }
}