import Task from "../Task";

export default class EventListener extends Task
{
  constructor(id) {
    super(id);
  }
  
  get hasIn() {
    return false;
  }
}