import './Menu.scss';
import { svgElement, aroundAt } from '../utils/utils';
import MenuIcon from '../assets/menu-icon.svg';
import ActorSelection from '../objects/ActorSelection';
import GraphSelection from '../graph/GraphSelection'
import API from '../API';
import Command from '../commands/Command';

class ContextMenu 
{
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'context-menu';

    this.actorMenuList = document.createElement('ul');
    this.addItem(this.actorMenuList, 'Clone', async () => {
      let command = await Commander.create('ImportActor', ActorSelection.selected[0].export()).process();
      History.push(command);
      let actor = command.getActor();
      actor.x = aroundAt(actor.x);
      actor.y = aroundAt(actor.y);
      // TODO: display some notification once completed
    })
    this.addItem(this.actorMenuList, 'Export to My Puppet', () => {
      API.createMyPuppet(ActorSelection.selected[0]);
      // TODO: display some notification once completed
    })

    this.opened = false;

    this.close = this.close.bind(this)
    document.addEventListener('click', this.close);

    document.getElementById('canvas').addEventListener('contextmenu', e => {
      if(ActorSelection.selected.length != 0) {
        this.openActorMenu();
      }
    })

    document.getElementById('block-container').addEventListener('contextmenu', e => {
      if(GraphSelection.selected) {
        this.openBlockMenu();
      }
    })
  }

  openActorMenu() {
    // override me, hehe...
    console.log(ActorSelection.selected);
    this.element.appendChild(this.actorMenuList);
  }

  openBlockMenu() {
    console.log(GraphSelection.selected);
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

  toggle(e) {
    this.opened = !this.opened;
    this.element.style.display = this.opened ? 'block': 'none';
  }

  close(e) {
    this.opened = false;
    this.element.style.display = 'none';
    if(this.element.contains(this.actorMenuList)) this.element.removeChild(this.actorMenuList);
    if(this.element.contains(this.blockMenuList)) this.element.removeChild(this.blockMenuList);
  }
}

export default new ContextMenu();