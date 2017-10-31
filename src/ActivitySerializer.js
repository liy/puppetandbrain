import Stage from './Stage'

export default class ActivitySerializer
{
  constructor() {
  }

  start() {
    let results = LookUp.pod();
    results.stage = [];
    for(let id of Stage.actors) {
      results.stage.push(id);
    }

    return results;
  }
}