import './ActorContextMenu.scss';
import { aroundAt } from '@/utils/utils';
import ActorSelection from '../objects/ActorSelection';
import GraphSelection from '../graph/GraphSelection'
import API from '@/API';
import Command from '../commands/Command';
import InputModal from './InputModal';
import NotificationControl from './NotificationControl';

export default class ActorContextMenu
{
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'actor-context-menu';

    this.actorMenuList = document.createElement('ul');
    this.addItem(this.actorMenuList, 'Clone', async () => {
      let command = await Commander.create('ImportActor', ActorSelection.selected[0].export()).process();
      Hub.history.push(command);
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

    Hub.on('actor.contextmenu', this.openActorMenu, this);

    // this.openBlockMenu = this.openBlockMenu.bind(this);
    // document.getElementById('block-container').addEventListener('contextmenu', this.openBlockMenu)
  }

  destroy() {
    Hub.off('actor.contextmenu', this.openActorMenu, this);
    document.removeEventListener('click', this.close);
  }

  openActorMenu({actor, event}) {
    if(!actor) return;

    this.opened = true;

    this.element.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
    // override me, hehe...
    this.element.appendChild(this.actorMenuList);
    document.body.appendChild(this.element);
  }

  // openBlockMenu(e) {
  //   if(!GraphSelection.selected) return;

  //   this.opened = true;
    
  //   document.body.appendChild(this.element);
  // }

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
      document.body.removeChild(this.element);
    }
  }
}