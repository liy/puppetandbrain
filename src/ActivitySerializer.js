import Stage from './Stage'

export default class ActivitySerializer
{
  constructor() {
  }

  start() {
    let actors = Object.create(null);

    actors.lookup = ActorLookUp.pod();
    actors.stage = [];
    for(let id of Stage.actors) {
      actors.stage.push(id);
    }

    return {
      actors,
      tasks: TaskLookUp.pod()
    }
  }
}