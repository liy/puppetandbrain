import {Task, Template as ParentTemplate} from '../Task'

export const Template = {
  ...ParentTemplate,
  // no execution in
  enter: {
    name: 'default',
    enabled: false
  },
  elementClass: ['listener']
}

export class Listener extends Task
{
  constructor(id) {
    super(id);
  }
}