export default class RoutePod
{
  constructor(actor) {
    this.actor = actor;
    this.routes = [];
    this.ids = []
  }

  start() {
    for(let key in this.actor.entryTasks) {
      let route = {
        tasks: {},
        ids: []
      }
      this.walk(this.actor.entryTasks[key], route);
      this.routes.push(route)
    }
    
    return this.routes;
  }

  walk(task, route) {
    route.tasks[task.id] = task.pod();
    route.ids.push(task.id);
    if(task.next) this.walk(task.next, route)
  }
}