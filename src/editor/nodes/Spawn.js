import { Task } from "./Task";

export default class Spawn extends Task
{
  constructor(id) {
    super(id);
  }

  init(pod) {
    super.init(pod);

    // TODO: how to identify the spawn target?????
  }
} 