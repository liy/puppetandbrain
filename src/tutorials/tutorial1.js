import Tutorial from './Tutorial';
import Browser from '../browser/Browser';
import { nextFrame } from '../utils/utils';
import Delay from '../switch/Delay';
import ActorSelection from '../objects/ActorSelection';

class AnimatePuppet extends Tutorial
{
  constructor() {
    super();
  }

  init() {

    let addButton = document.getElementById('add-actor-button');
    addButton.classList.add('data-title-show')

    this.addStep(() => {
      this.cursor.moveTo(addButton)

      addButton.addEventListener('mousedown', e => {
        addButton.classList.remove('data-title-show')
        this.next();
      }, {once: true})
    });

    this.addStep(() => {
      Browser.openedBrowser.on('browser.content.ready', async e => {
        let box = this.getPuppetFromBrowser('Little Mice');
        this.cursor.moveTo(box);
        box.addEventListener('click', e => {
          this.next();
        }, {once: true})
      })
    })

    this.addStep(() => {
      let actor = LookUp.getActors()[0];
      this.cursor.moveToLocation(actor.screenX, actor.screenY);

      ActorSelection.once('actor.selection.change', selected => {
        this.next();
      })
    })

    this.addStep(() => {
      let button = document.getElementById('mode-button');
      button.classList.add('data-title-show')
      this.cursor.moveTo(button);
      button.focus()

      button.addEventListener('mousedown', e => {
        button.classList.remove('data-title-show')
        this.next();
      }, {once: true})
    });

    this.addStep(() => {
      addButton.classList.add('data-title-show')
      this.cursor.moveTo(addButton);
      addButton.addEventListener('mousedown', e => {
        addButton.classList.remove('data-title-show')
        this.next();
      }, {once: true})
    });

    this.addStep(() => {
      let block = this.getBlockFromBrowser('Animation');
      this.cursor.fadeIn();
      this.cursor.moveInto(block);

      block.addEventListener('click', e => {
        document.body.appendChild(this.cursor.element);
        this.next();
      }, {once: true})
    })

    this.addStep(() => {
      let block = this.getBlock('Game Start');
      if(block) {
        this.cursor.moveTo(block.element);
        let target = this.getOutPinSvg(block);
        if(target) {
          this.cursor.moveTo(target);
          target.addEventListener('mousedown', e => {
            this.next();
          }, {once: true});
        }
      }
    })

    var animationBlock = null;
    this.addStep(() => {
      animationBlock = this.getBlock('Animation');
      let target = this.getInPinSvg(animationBlock);
      this.cursor.moveTo(target);

      target.addEventListener('mouseup', e => {
        this.next();
      }, {once: true});
    })

    this.addStep(() => {
      let pin = animationBlock.inputPins.get('name');
      this.cursor.moveTo(pin.label);

      pin.gadget.once('gadget.state.change', name => {
        console.log(name);
        this.next();
      })
    })


    this.addStep(() => {
      let modeBtn = document.getElementById('mode-button');
      this.cursor.moveTo(modeBtn);

      modeBtn.addEventListener('mousedown', e => {
        this.next();
      }, {once:true})
    })

    this.addStep(() => {
      let debugBtn = document.getElementById('debug-button');
      this.cursor.moveTo(debugBtn);

      debugBtn.addEventListener('mousedown', e => {
        this.next();
      }, {once:true})
    })
  }
}

const tutoril = new AnimatePuppet();
tutoril.init();
export default tutoril;