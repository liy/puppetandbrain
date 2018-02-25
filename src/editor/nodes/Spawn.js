import { Task } from "./Task";

export default class Spawn extends Task
{
  constructor(id, activity) {
    super(id, activity);
  }

  init(pod) {
    super.init(pod);

    // TODO: how to identify the spawn target?????
  }
} 