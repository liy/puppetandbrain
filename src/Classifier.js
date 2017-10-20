import * as tasks from './tasks'
import SpineActor from './objects/SpineActor';
import SpriteActor from './objects/SpriteActor';

const scope = {
  ...tasks,
  SpineActor,
  SpriteActor,
}

export default function classfier(json) {
  console.log(json)
  let data = JSON.parse(json);
  return scope[data.class].deserialize(data);
}