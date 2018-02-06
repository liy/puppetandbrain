import Tutorial from './Tutorial';
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
      this.cursor.moveTo('add-actor-button', 'left')
      this.nextWhen('browser.opened')
    });

    this.addStep(() => {
      this.banner.info('It might take a while to load, be patient...');

      this.when('browser.content.ready', e => {
        this.banner.info('Now, I know you want to pick the yellow fat cat');
        this.cursor.moveTo(this.browserPuppet('Bouncy Cat'));

        this.when('stage.actor.added', actor => {
          this.cursor.fadeOut();
          this.banner.info('Be patient while it is loading...');
          
          this.nextWhen('actor.ready', actor);
        }, Editor.stage);
      })
    })

    this.addStep(actor => {
      this.banner.info('Select the puppet on the stage once it is loaded');
      this.cursor.moveToLocation(actor.screenX, actor.screenY, 'right');
      this.nextWhen('actor.selection.change', ActorSelection);
    })

    this.addStep(async () => {
      this.cursor.indicate('mode-button');
      this.banner.push('Notice that the purple button on the left is enabled?')
                 .push('It is the <b>Open brain<b> button...', true)
                 .push("Yes, open the puppet's brain!")
      await this.banner.start();
      this.banner.info('Click it to open its brainnnn...');

      this.cursor.goto('mode-button', 'bottom');

      this.nextWhen('graph.opened')
    });

    this.addStep(async () => {
      this.banner.push('Now you are in the brain of a puppet, nicely done!')
                 .push('You can mess around with its brain later')
                 .push("For now, let's add a <b>block</b> into the brain...", true)
      await this.banner.start();
      this.banner.info('Click the add button to add a block');

      this.cursor.moveTo('add-actor-button', 'left');

      this.nextWhen('browser.opened')
    });

    this.addStep(async () => {
      this.banner.push('What is a <b>Block</b> you might wondering...', true)
                 .push("It is basically a small processing unit of a puppet's brain")
                 .push("And there are lots of them... they all have different behaviours")
                 .push("You can <b>connect</b> them to make the puppet alive!", true)
                 .push("Let's find one called <b>Animation</b>", true)
      await this.banner.start();

      this.banner.info('You might want to scroll down to find the <b>Animation</b> block', true);
      
      this.cursor.follow(this.browserBlock('Animation'), 'bottom');

      this.when('graph.block.added', async e => {
        // You have to manually cancel the follow here
        this.cursor.cancelFollow();

        if(e.detail.block.node.nodeName == 'Animation' ) {
          this.next();
        }
        // handles user select wrong block
        else {
          this.cursor.fadeOut();

          this.banner.push('Are you sure this is an <b>Animation</b> block?', true)
                     .push("Let's try it again...");
          await this.banner.start();

          this.banner.info('Click the add button to find an <b>Animation</b> block', true);
          this.cursor.moveTo('add-actor-button', 'left');

          this.when('browser.opened', this.redo);
        }
      });
    })

    this.addStep(async () => {
      this.banner.push("Now you have an <b>Animation</b> block in the puppe's brain", true)
        .push("The other green one is called <b>Game Start</b> block", true)
        .push("Let's try to connect them together see what will happen...")
      await this.banner.start();
      this.banner.info('Drag the <b>Game Start</b> white pin...', true);

      const gameStartBlock = this.getBlock('Game Start');
      const outPin = this.getOutPin(gameStartBlock);
      this.cursor.moveTo(outPin, 'right');

      const animationBlock = this.getBlock('Animation');
      this.when('mousedown', () => {
        this.banner.info("and connect to the <b>Animaton</b>'s left white pin...", true);

        const target = this.getInPin(animationBlock);
        this.cursor.moveTo(target, 'right');
      }, outPin);

      // handles user quick connect
      this.when('browser.opened', async e => {
        this.cursor.fadeOut();

        this.banner.push("Oops... you just performed a shortcut to add block")
          .push('This is an advance feature in later tutorial')
        await this.banner.start();

        this.banner.info('Click the close button and try again...')
        this.cursor.moveTo('close-browser-button', 'right');

        this.when('browser.closed', this.redo);
      })

      this.when('execution.connected', data => {
        if(data.source.node == gameStartBlock.node && data.targetNode == animationBlock.node) {
          this.next();
        }
      }, gameStartBlock.node)
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
      this.when('mouseup', e => {
        // make sure the gadget is visible
        if(pin.gadget.visible) {
          this.banner.info('Pick an animation you like');
        }
      }, pin.label)

      this.nextWhen('gadget.state.change', pin.gadget);
    })


    this.addStep(async () => {
      this.banner.push("Good job, Let's get back to the stage to have a better view of the puppet")
      await this.banner.start();

      this.banner.info('Click the back to stage button')

      let modeBtn = document.getElementById('mode-button');
      this.cursor.moveTo(modeBtn, 'bottom');

      this.nextWhen('graph.closed')
    })

    this.addStep(async () => {
      this.banner.push("Now the puppet is ready...")
      await this.banner.start();

      this.banner.info('Click the magic play button');
      this.cursor.moveTo('debug-button', 'left');

      this.when('game.start', async e => {
        window.localStorage.setItem('animate-a-puppet', true);

        this.cursor.fadeOut();
        
        this.banner.push('See, an animating puppet on the stage!')
          .push("A 🍭 for you...")
          .push('and congratulations! You just had made your puppet alive!')
        await this.banner.start();

        this.next();
      }, Editor)
    })
  }
}

const tutoril = new AnimatePuppet();
tutoril.init();
export default tutoril;