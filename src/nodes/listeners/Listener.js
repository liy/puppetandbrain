import {Task, Template as TaskTemplate} from '../Task'

export const Template = {
  ...TaskTemplate,
  // no execution in
  in: [],
  elementClass: ['listener']
}

export class Listener extends Task
{
  constructor(id) {
    super(id);
  }

  get elementClassName() {
    return ['listener'];
  }
}