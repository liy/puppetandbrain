import Tutorial from './Tutorial';
import Browser from '../browser/Browser';
import ActorSelection from '../objects/ActorSelection';
import TutorialBanner from './TutorialBanner';

class AnimatePuppet extends Tutorial
{
  constructor() {
    super();
  }

  init() {
    this.addStep(async () => {
      this.banner.push('Me🤖, the author speaking...')
                 .push('You fancy a fat bouncy cat🐱?')
                 .push("OK, let's make one...")
      await this.banner.start();
      this.next();
    })

    this.addStep(() => {
      this.banner.info("Click the <b>Add puppet</b> to add a... puppet! Obviously...", true);

      let addButton = document.getElementById('add-actor-button');
      this.cursor.moveTo(addButton, 'left')

      document.addEventListener('browser.opened', e => {
        this.next();
      }, {once: true})
    });

    this.addStep(() => {
      this.banner.info('It might take a while to load all the avaiable puppets, be patient...');

      document.addEventListener('browser.content.ready', async e => {
        this.banner.info('Now, I know you want to pick that yellow fat cat');

        let box = this.getPuppetFromBrowser('Bouncy Cat');
        this.cursor.moveTo(box);
        box.addEventListener('click', e => {
          this.next();
        }, {once: true})
      })
    })

    this.addStep(async () => {
      this.banner.info('You have to be patient while it is loading..')
      setTimeout(() => {
        this.next();
      }, 1000)
    });


    this.addStep(async () => {
      this.banner.push('Once it is loaded...')
      await this.banner.start();
      this.banner.info('Select the puppet on the stage');

      let actor = LookUp.getActors()[0];
      this.cursor.moveToLocation(actor.screenX, actor.screenY, 'right');

      ActorSelection.once('actor.selection.change', selected => {
        this.next();
      })
    })

    this.addStep(async () => {
      this.banner.push('Notice that the top left corner button is enabled?')
                 .push('It is the <b>OPEN BRAIN<b> button...', true)
                 .push("Yes, open the puppet's brain!")
      await this.banner.start();
      this.banner.info('Now click it, open its brainnnn...');

      let button = document.getElementById('mode-button');
      this.cursor.moveTo(button, 'bottom');
      button.focus()

      document.addEventListener('graph.opened', e => {
        this.next();
      }, {once: true})
    });

    this.addStep(async () => {
      this.banner.push('Now you are in the brain of a puppet, nicely done!')
                 .push('You can mess around with its brain later')
                 .push("For now, let's add a <b>block</b> into the brain...", true)
      await this.banner.start();
      this.banner.info('Click the add button to add a block');

      let addButton = document.getElementById('add-actor-button');
      this.cursor.moveTo(addButton, 'left');

      document.addEventListener('browser.opened', e => {
        this.next();
      }, {once: true})
    });

    this.addStep(async () => {
      this.banner.push('What is a block you might wondering...')
                 .push("It is basically a small processing unit of a puppet's brain")
                 .push("And there are loads of them... they are all different from each other")
                 .push("You can combine them to make the puppet alive...well, sort of alive...")
                 .push("Let's find one called <b>Animation</b>", true)
      await this.banner.start();
      this.banner.info('You might want to scroll down, to find the <b>Animation</b> block', true);
      
      this.cursor.fadeIn();
      
      let templateBlock = this.getBlockFromBrowser('Animation');
      let intervalID = setInterval(() => {
        this.cursor.moveTo(templateBlock, 'bottom');
      }, 300);

      // FIXME: better way to handle things, maybe revert the step
      var onBlockCreation = async (e) => {
        clearInterval(intervalID);
        console.log(e, e.detail)
        if(e.detail.block.node.nodeName == 'Animation' ) {
          document.removeEventListener('graph.block.added', onBlockCreation);
          this.next();
        }
        else {
          this.cursor.fadeOut();
          this.banner.push('Are you sure this is an <b>Animation</b> block?', true)
                     .push("Let's try it again...");
          await this.banner.start();

          this.banner.info('Click the add button to add <b>Animation</b> block', true);
          let addButton = document.getElementById('add-actor-button');
          this.cursor.moveTo(addButton, 'left');

          document.addEventListener('browser.opened', e => {
            this.cursor.fadeOut();
            this.redo();
          }, {once: true})
        }
      }

      document.addEventListener('graph.block.added', onBlockCreation);
    })

    this.addStep(async () => {
      this.banner.push("Now you have an <b>Animation</b> blocks in the puppe's brain", true)
        .push("The other green one is called <b>Game Start</b> block", true)
        .push("Let's try to connect them together see what will happen...")
      await this.banner.start();
      this.banner.info('Drag the <b>Game Start</b> white pin...', true);

      let block = this.getBlock('Game Start');
      if(block) {
        let target = this.getOutPinSvg(block);
        if(target) {
          this.cursor.moveTo(target, 'right');
          target.addEventListener('mousedown', e => {
            this.next();
          }, {once: true});
        }
      }
    })

    this.addStep(() => {
      this.banner.info("and connect to the <b>Animaton</b>'s left white pin...", true);

      let gameStartBlock = this.getBlock('Game Start');

      let animationBlock = this.getBlock('Animation');
      let target = this.getInPinSvg(animationBlock);
      this.cursor.moveTo(target, 'left');

      gameStartBlock.node.once('execution.connected', data => {
        if(data.source.node == gameStartBlock.node && data.targetNode == animationBlock.node) {
          this.next();
        }
      })
    })

    this.addStep(async () => {
      this.banner.push("Well done, you just made the puppet ali...well, ready to animated.")
        .push('By connecting two blocks, it basically means...')
        .push('When the game starts...')
        .push('Do an animation!')
        .push('What animation, you might wondering...')
      await this.banner.start();

      let animationBlock = this.getBlock('Animation');
      let pin = animationBlock.inputPins.get('name');
      this.cursor.moveTo(pin.label, 'right');
      
      this.banner.info('Click the name label to see what animations are available.')
      // This is not once event... not a big deal, once the label is removed, the event should be gb.
      pin.label.addEventListener('mouseup', e => {
        // make sure the gadget is visible
        if(pin.gadget.visible) {
          this.banner.info('Pick an animation you like');
        }
      })

      pin.gadget.once('gadget.state.change', name => {
        this.next();
      })
    })


    this.addStep(async () => {
      this.banner.push("Good job, Let's get back to the stage to have a better view of the puppet")
      await this.banner.start();

      this.banner.info('Click the back to stage button')

      let modeBtn = document.getElementById('mode-button');
      this.cursor.moveTo(modeBtn, 'bottom');

      document.addEventListener('graph.closed', e => {
        this.next();
      }, {once:true})
    })

    this.addStep(async () => {
      this.banner.push("Now the puppet is ready...")
      await this.banner.start();

      this.banner.info('Click the magic play button');

      let debugBtn = document.getElementById('debug-button');
      this.cursor.moveTo(debugBtn, 'left');

      Editor.once('game.start', async e => {
        window.localStorage.setItem('animate-a-puppet', true);

        this.cursor.fadeOut();
        
        this.banner.push('See, an animating puppet on the stage!')
          .push("A 🍭 for you...")
        await this.banner.start();

        this.next();
      }, {once:true})
    })
  }
}

const tutoril = new AnimatePuppet();
tutoril.init();
export default tutoril;