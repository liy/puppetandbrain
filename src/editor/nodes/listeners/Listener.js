import {Task, Template as ParentTemplate} from '../Task'

export const Template = {
  ...ParentTemplate,
  // no execution in
  enter: {
    name: 'default',
    enabled: false
  },
  elementClass: ['listener'],
  category: 'Event',
  keywords: ['event', 'listener']
}

export class Listener extends Task
{
  constructor(id, lookUp) {
    super(id, lookUp);
  }
}