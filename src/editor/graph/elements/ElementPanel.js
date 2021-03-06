import './ElementPanel.scss';

import CreateGenericButton from './CreateGenericButton';
import CreateListButton from './CreateListButton';
import CreateMapButton from './CreateMapButton';
import CreatePositionButton from './CreatePositionButton';
import CreateColorButton from './CreateColorButton';
import CreateActorButton from './CreateActorButton';
import CreateAudioButton from './CreateAudioButton';
import { svgElement } from '@/utils/utils';

import PullIcon from '@/assets/pull-icon.svg';
import CreateImageButton from './CreateImageButton';
import CreateBooleanButton from './CreateBooleanButton';

import store from '@/store';

export default class
{
  constructor() {
    this.width = 300;
    this.element = document.createElement('div');
    this.element.id = 'element-panel';
    this.element.style.width = `${this.width}px`

    this.title = document.createElement('span');
    this.title.id = 'element-panel-title';
    this.title.textContent = 'Property';
    this.element.appendChild(this.title)

    this.content = document.createElement('div');
    this.content.id = 'element-panel-content';
    this.content.style.display = 'none'
    this.element.appendChild(this.content)
    
    this.control = document.createElement('div');
    this.control.id = 'element-panel-control';
    this.element.appendChild(this.control)

    this.pullBtn = document.createElement('div');
    this.pullBtn.id = 'pull-button';
    this.pullBtn.setAttribute('data-title', 'toggle property panel')
    this.pullBtn.setAttribute('data-title-position', 'left')
    this.element.appendChild(this.pullBtn);
    // detail icon
    this.pullIcon = svgElement(PullIcon, {width:15, height:23});
    this.pullBtn.appendChild(this.pullIcon);
    // toggle panel
    this.visible = false;
    this.pullBtn.addEventListener('mousedown', e => {
      this.toggle();
    })

    // variable buttons
    let genericButton = new CreateGenericButton();
    let listButton = new CreateListButton();
    let mapButton = new CreateMapButton();
    let positionButton = new CreatePositionButton();
    let pipetteButton = new CreateColorButton();
    let actorButton = new CreateActorButton();
    let audioButton = new CreateAudioButton();
    let imageButton = new CreateImageButton();
    let booleanButton = new CreateBooleanButton();

    this.control.appendChild(genericButton.element);
    this.control.appendChild(booleanButton.element);
    this.control.appendChild(listButton.element);
    this.control.appendChild(mapButton.element);
    this.control.appendChild(positionButton.element);
    this.control.appendChild(pipetteButton.element);
    // this.control.appendChild(actorButton.element);
    this.control.appendChild(audioButton.element);
    this.control.appendChild(imageButton.element);

    let onTransitionEnd = (e) => {
      if(e.target == this.element) {
        if(!this.visible) {
          this.content.style.display = 'none'
        }
      }
    }
    
    this.element.addEventListener('transitionend', onTransitionEnd)
    this.element.addEventListener('webkitTransitionEnd', onTransitionEnd)
    this.element.addEventListener('msTransitionEnd', onTransitionEnd)

    // stop zoom gragh
    this.element.addEventListener('wheel', e => {
      e.stopPropagation();
    })

    // prevent pull to refresh on element panel
    var touchStartY = 0;
    this.element.addEventListener('touchstart', e => {
      touchStartY = e.touches[0].clientY
    })
    this.element.addEventListener('touchmove', e => {
      if(window.pageYOffset==0 && e.touches[0].clientY-touchStartY > 0 && this.content.scrollTop == 0) {
        e.preventDefault();
      }
    })
  }

  toggle() {
    this.element.style.transform = this.visible ? `translateX(100%)` : `translateX(0)`;
    this.visible = !this.visible;
    this.pullIcon.style.transform = `scaleX(${this.visible?-1:1})`;
    if(this.visible) this.content.style.display = 'block'

    // set the state of the panel so other vue components can react
    store.commit('setPropertyPanelVisibility', this.visible);
  }

  clear() {
    while(this.content.lastChild) {
      this.remove(this.content.lastChild);
    }
  }

  append(element) {
    this.content.appendChild(element);
  }

  remove(element) {
    this.content.removeChild(element);
  }
}