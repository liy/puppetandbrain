import store from '@/store';

export default class SceneManager
{
  constructor() {
    this.originalID = null;
  }

  start() {
    if(this.originalID==null) this.originalID = Hub.activity.id;
  }

  to(id) {
    Hub.clear();
    Hub.load(id).then(() => {
      store.commit('updateDebugMode', true);
    })
  }

  reset() {
    Hub.clear();
    Hub.load(this.originalID);
  }
}