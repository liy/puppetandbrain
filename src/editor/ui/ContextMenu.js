import './ContextMenu.scss';
import { aroundAt } from '@/utils/utils';
import ActorSelection from '../objects/ActorSelection';
import GraphSelection from '../graph/GraphSelection'
import API from '@/API';
import Command from '../commands/Command';
import InputModal from './InputModal';
import NotificationControl from './NotificationControl';

export default class ContextMenu 
{
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'context-menu';

    this.actorMenuList = document.createElement('ul');
    this.addItem(this.actorMenuList, 'Clone', async () => {
      let command = await Commander.create('ImportActor', ActorSelection.selected[0].export()).process();
      EditorHistory.push(command);
      let actor = command.getActor();
      actor.x = aroundAt(actor.x);
      actor.y = aroundAt(actor.y);
      // TODO: display some notification once completed
    })
    this.addItem(this.actorMenuList, 'Save to My Puppets', async () => {
      let actor = ActorSelection.selected[0];
      let {action, data:name} = await InputModal.exportMyPuppet(actor.name);
      if(action) {
        API.createMyPuppet(actor, name).then(() => {
          // display some notification once completed
          NotificationControl.notify(`${name} has been added to your library`).delayFadeoutRemove();
        })
        // }).catch(() => {
        //   NotificationControl.notify('Error adding My Puppet').delayFadeoutRemove();
        // })
      }
    })

    this.opened = false;

    this.close = this.close.bind(this)
    document.addEventListener('click', this.close);

    ActivityManager.on('contextmenu', this.openActorMenu, this);

    this.openBlockMenu = this.openBlockMenu.bind(this);
    document.getElementById('block-container').addEventListener('contextmenu', this.openBlockMenu)
  }

  destroy() {
    ActivityManager.off('contextmenu', this.openActorMenu, this);
    document.removeEventListener('click', this.close);
    document.getElementById('block-container').removeEventListener('contextmenu', this.openBlockMenu)
  }

  openActorMenu({actor, event}) {
    if(!actor) return;

    this.opened = true;

    this.element.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    // override me, hehe...
    this.element.appendChild(this.actorMenuList);
    document.body.appendChild(this.element);
  }

  openBlockMenu(e) {
    if(!GraphSelection.selected) return;

    this.opened = true;
    
    document.body.appendChild(this.element);
  }

  addItem(list, text, handler) {
    let entry = document.createElement('li');
    entry.textContent = text;
    list.appendChild(entry);
    entry.addEventListener('click', e => {
      e.preventDefault();
      handler.call(this);
    })
  }

  close(e) {
    if(this.opened) {
      this.opened = false;
      if(this.element.contains(this.actorMenuList)) this.element.removeChild(this.actorMenuList);
      if(this.element.contains(this.blockMenuList)) this.element.removeChild(this.blockMenuList);
      document.body.removeChild(this.element);
    }
  }
}