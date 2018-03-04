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
    // TODO: lock editing, lock history

    Hub.clear();
    Hub.load(id).then(() => {
      // update ui
      store.commit('updateDebugMode', true);
      // once game stops go back to original activity
      Hub.activity.on('game.stop', this.reset, this);
      // start game
      Hub.stage.start();
    })
  }

  reset() {
    console.log('reset???')
    Hub.clear();
    Hub.load(this.originalID);
    this.originalID = null;
  }
}