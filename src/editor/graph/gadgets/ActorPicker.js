import './ActorPicker.scss'

import Gadget from "./Gadget";
import TextField from "./TextField";

import PipetteIcon from '@/assets/pipette.svg'; 
import {svgElement} from '../../utils/utils';
import ActorSelection from '../../objects/ActorSelection';

export default class extends Gadget
{
  constructor(actorID=0) {
    super();

    this.element.classList.add('actor-picker');
    this.element.tabIndex = 0;

    this.nameField = new TextField('','pick a puppet...')
    this.element.appendChild(this.nameField.element);

    this.picker = document.createElement('div');
    this.picker.className = 'gadget-icon';
    this.picker.appendChild(svgElement(PipetteIcon,{width:16, height:16}));
    this.element.appendChild(this.picker);

    this.value = actorID;

    this.keyDown = this.keyDown.bind(this);

    this.element.addEventListener('mousedown', e => {
      e.preventDefault();
      e.stopPropagation();

      document.addEventListener('keydown', this.keyDown, true);
      
      BrainGraph.hide();

      document.body.style.cursor = 'crosshair';
      ActorSelection.once('actor.selection.selected', this.onActorSelection, this)
    })
  }

  onActorSelection(selected) {
    ActorSelection.off('actor.selection.selected', this.onActorSelection, this)
    document.removeEventListener('keydown', this.keyDown, true);

    BrainGraph.show();
    document.body.style.cursor = 'auto';
    
    if(selected[0]) {
      this.value = selected[0].id;
      this.emit('gadget.state.change', this.value);
    }
  }

  keyDown(e) {
    if(e.keyCode == 27) {
      ActorSelection.off('actor.selection.selected', this.onActorSelection, this)
      document.removeEventListener('keydown', this.keyDown, true);

      // makes sure only exit from picking mode
      e.stopPropagation();
      e.stopImmediatePropagation()

      BrainGraph.show();
      document.body.style.cursor = 'auto';
    }
  }

  get value() {
    return this.actorID;
  }

  set value(id) {
    this.actorID = id;
    let actor = LookUp.get(this.actorID);
    this.nameField.value = actor ? `${actor.name} ${actor.id}` : '';
  }
}