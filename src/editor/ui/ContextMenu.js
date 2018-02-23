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
  constructor(Editor) {
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

    // document.getElementById('canvas').addEventListener('contextmenu', e => {
    //   const canvas = document.getElementById('canvas');
    //   const rect = canvas.getBoundingClientRect();
    //   // FIXIME: handle scale!!
    //   let actor = ActorSelection.selected[0]
    //   if(actor && actor.hitTest(e.clientX-rect.left, e.clientY-rect.top)) {
    //     this.openActorMenu(e);
    //   }
    // })

    Editor.on('contextmenu', ({actor, event}) => {
      if(actor) {
        this.openActorMenu(event);
      }
    }, this)

    document.getElementById('block-container').addEventListener('contextmenu', e => {
      if(GraphSelection.selected) {
        this.openBlockMenu();
      }
    })
  }

  openActorMenu(e) {
    this.opened = true;

    this.element.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    // override me, hehe...
    console.log(ActorSelection.selected);
    this.element.appendChild(this.actorMenuList);
    document.body.appendChild(this.element);
  }

  openBlockMenu() {
    this.opened = true;
    
    console.log(GraphSelection.selected);
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