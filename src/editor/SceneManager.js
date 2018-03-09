import store from '@/store';
import NotificationControl from './ui/NotificationControl';

export default class SceneManager
{
  constructor() {
    this.originalID = null;
  }

  start() {
    if(this.originalID==null) this.originalID = Hub.activity.id;
  }

  async to(id) {
    const chip = NotificationControl.notify(`Loading activity`);

    // force to save the activity before you go to another activity
    let saving = Hub.save();
    // lock everything
    Hub.lock();
    // wait until save completed
    await saving;

    Hub.clear(false);
    await Hub.load(id)

    // once game stops go back to original activity
    Hub.activity.on('game.stop', this.reset, this);
    // start game
    Hub.stage.start();
    // update ui
    store.commit('updateDebugMode', true);

    // unlock mode and debug button
    Hub.unlock(['modeLock', 'debugLock']);

    chip.fadeOut();
  }

  async reset() {
    const chip = NotificationControl.notify(`Loading activity`);

    // lock everything
    Hub.lock();

    Hub.activity.off('game.stop', this.reset, this);
    Hub.clear(false);
    
    await Hub.load(this.originalID);
    this.originalID = null;

    // unlock everything
    Hub.unlock();

    chip.fadeOut();
  }
}