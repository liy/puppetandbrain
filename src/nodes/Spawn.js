import { Task } from "./Task";

export default class Spawn extends Task
{
  constructor(id) {
    super(id);
  }

  init(pod) {
    super.init(pod);

    // TODO: require a puppetID reference to the user saved puppet.
    // so I know I need to preload files.
  }
} 