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



Call Actor PlayAnimation Function
> aniamtionName


PlayAnimation Function
animationName >