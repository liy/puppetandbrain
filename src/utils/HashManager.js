import Rusha from 'rusha';
import { isMobile } from './utils';

class HashManager
{
  constructor() {
    this.tasks = new Map();

    if(!isMobile) {
      this.onMessage = this.onMessage.bind(this);
      this.worker = Rusha.createWorker();
      this.worker.addEventListener('message', this.onMessage);
    }
  }

  add(task) {
    this.tasks.set(task.id, task);

    // do not use web worker on web
    if(isMobile) {
      let hash = Rusha.createHash().update(task.data).digest('hex');
      task.resolve(hash); 
    }
    else {
      this.worker.postMessage({
        id: task.id,
        data: task.data
      })
    }
  }

  onMessage(e) {
    let task = this.tasks.get(e.data.id);
    if(task) {
      task.resolve(e.data.hash);
      this.tasks.delete(e.data.id);
    }
  }
}

export default new HashManager();