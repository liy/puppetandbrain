import {Task, Template as TaskTemplate} from '../Task'

export const Template = {
  ...TaskTemplate,
  // no execution in
  ins: [],
  elementClass: ['listener']
}

export class Listener extends Task
{
  constructor(id) {
    super(id);
  }
}