import './ActorPicker.scss'

import Gadget from "./Gadget";
import TextField from "./TextField";

import PipetteIcon from '../../assets/pipette.svg'; 
import {svgElement} from '../../utils/utils';
import ActorSelection from '../../objects/ActorSelection';

export default class extends Gadget
{
  constructor(actorID=0) {
    super();

    this.element.classList.add('actor-picker');

    this.nameField = new TextField('','pick an actor...')
    this.element.appendChild(this.nameField.element);

    this.picker = document.createElement('div');
    this.picker.className = 'gadget-icon';
    this.picker.appendChild(svgElement(PipetteIcon,{width:16, height:16}));
    this.element.appendChild(this.picker);

    this.value = actorID;

    this.picker.addEventListener('mousedown', e => {
      e.stopPropagation();
      
      BrainGraph.hide();

      document.body.style.cursor = 'crosshair';
      ActorSelection.once('actor.selection.selected', selected => {
        BrainGraph.show();
        document.body.style.cursor = 'auto';
        
        if(selected[0]) {
          this.value = selected[0].id;
          this.emit('gadget.state.change', this.value);
        }
      })
    })
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