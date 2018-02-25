import { Task } from "./Task";

export default class Spawn extends Task
{
  constructor(id, lookUp) {
    super(id, lookUp);
  }

  init(pod) {
    super.init(pod);

    // TODO: how to identify the spawn target?????
  }
} 