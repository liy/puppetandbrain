import Tutorial from './Tutorial';
import ActorSelection from '@/editor/objects/ActorSelection';
import TutorialBanner from './TutorialBanner';
import { isMobile } from '@/utils/utils';
import ActorImporter from '../editor/ActorImporter';
import GraphSelection from '../editor/graph/GraphSelection';

class UserInteravtionTutorial extends Tutorial
{
  constructor() {
    super();
  }

  async init() {
    super.init();

    const actorPod = await API.getPuppet('zqTVeCemqwv4Wr6A55tf')
    let importActor = new ActorImporter(Hub.activity);
    let actor = await importActor.start(actorPod)

    this.addStep(async () => {
      this.banner.push('Hi again!')
        .push("Let me show you how to add user interactions.")
        .push("We are going to create a fat cat escapes from your mouse click")
      await this.banner.start();
      
      this.banner.info('Open the brain of the puppet');

      this.cursor.moveToActor(actor, 'right');
      await this.waitUntil('actor.selection.change', ActorSelection);

      this.cursor.goto('mode-button', 'bottom');
      this.nextWhen('graph.opened');
    })

    this.addStep(async () => {
      this.banner.push("Let's add a block called <b>Click Event</b>")
      await this.banner.start();
      
      this.banner.info('Click the add button to find an <b>Click Event</b> block.');
      this.cursor.moveTo('add-button', 'left');

      this.nextWhen('browser.opened')
    })

    this.addStep(async () => {
      this.banner.push("You can either type click in the search field")
        .push("or scroll down to find the <b>Click Event</b> block")
      await this.banner.start();

      this.banner.info('You might need to scroll down to find the <b>Click Event</b> block.');
      this.cursor.follow(() => {
        return this.browserBlock('Click Event');
      }, 'bottom');

      this.once('graph.block.added', async e => {
        // You have to manually cancel the follow here
        this.cursor.cancelFollow();

        if(e.detail.block.titleText == 'Click Event' ) {
          // pass the click block to next step
          this.next(e.detail.block);
        }
        // handles user select wrong block
        else {
          this.cursor.fadeOut();

          this.banner.push('This is not <b>Click Event</b> block.')
                     .push("Let's try it again.");
          await this.banner.start();

          this.banner.info('Click the add button to find an <b>Click Event</b> block.');
          this.cursor.moveTo('add-button', 'left');

          this.once('browser.opened', this.redo);
        }
      });
    })
    
    this.addStep(async (clickBlock) => {
      this.banner.push('You might wondering what is an event block?')
        .push("You've seen <b>Game Event</b> block")
        .push("and the <b>Click Event</b> block you just added...")
        .push('Think of it as your morning wake up alarm...')
        .push('That is an event tells you to wake up!')
        .push('Now, the <b>Click Event</b> is the same idea')
        .push('It tells you when the puppet is clicked.')
        .push('More preceicly, it shows you 2 events...')
        .push('When your left mouse is <b>click down on the puppet</b>', () => {
          this.cursor.indicate(this.getOutPinElement(clickBlock, 'down'))
        })
        .push('and when your left mouse is <b>released off from the puppet</b>', () => {
          this.cursor.indicate(this.getOutPinElement(clickBlock, 'up'))
        })
      await this.banner.start();

      this.next(clickBlock);
    });

    this.addStep(async () => {
      this.banner.push('The idea is when your mouse is down on the puppet, it runs away.')
        .push("You need an another block called <b>Move To</b> to make it happen")
      await this.banner.start();

      this.next()
    })

    this.addStep(this.findBlockStep('Move To'))

    this.addStep(async (block) => {
      this.banner.push("It is a good habit to keep puppet's brain clean.")
        .push("Game Event block is not used in this tutorial")
        .push("Let's delete it.");
      await this.banner.start();
      this.next();
    })

    this.addStep(() => {
      this.banner.info('Select Game Event block')

      let block = this.getBlock('Game Event');
      this.cursor.moveToBlock(block, 'bottom');

      this.when('block.selection.change', async (selected) => {
        if(selected) {
          if(selected.titleText == 'Game Event') {
            this.banner.push("To delete the Game Event block, you can either...")
              .push("Click the delete button, or...", () => {
                this.cursor.indicate('delete-button');
              })
              .push("Or press the delete key on your keyboard")
            await this.banner.start();

            this.cursor.moveTo('delete-button', 'left');

            this.banner.info('Delete Game Event block')
          }
          else {
            this.banner.push("Please select <b>Game Event</b> block")
              .push(`Not the <b>${selected.titleText}</b> block`)
            await this.banner.start();
            this.redo();
          }
        }
        else {
          this.redo();
        }
      }, GraphSelection)

      this.nextWhen('block.deleted', BrainGraph);
    })
    
    this.addStep(async () => {
      this.banner.push("Great, now the brain is cleaned up")
        .push('We are ready to connect 2 blocks together')
      await this.banner.start();

      this.next();
    });

    this.addStep(async () => {
      const clickEventBlock = this.getBlock('Click Event')
      const downPinElement = this.getOutPinElement(clickEventBlock, 'down')
      const downPinLabel = clickEventBlock.outPins.get('down').name;
      const moveToBlock = this.getBlock('Move To')

      if(isMobile) {
        this.banner.info(`Tap the <b>${downPinLabel}</b> pin of <b>${clickEventBlock.titleText}</b>...`);
      }
      else {
        this.banner.info(`Drag the <b>${downPinLabel}</b> pin of <b>${clickEventBlock.titleText}</b> and connect to the <b>${moveToBlock.titleText}</b> left pin`);
      }

      this.cursor.moveTo(downPinElement, 'right');
      
      if(isMobile) {
        this.once('touchstart', () => {
          this.banner.info(`And tap the left white pin of the <b>${moveToBlock.titleText}</b> block to form the connection.`);
          const target = this.getInPinElement(moveToBlock);
          this.cursor.moveTo(target, 'right');
        }, downPinElement);
      }
      else {
        this.once('mousedown', () => {
          this.banner.info(`And connect to the <b>${moveToBlock.titleText}</b>'s left white pin.`);
          const target = this.getInPinElement(moveToBlock);
          this.cursor.moveTo(target, 'right');
        }, downPinElement);

        this.once('mouseup', () => {
          const enter = this.getEnter(moveToBlock);
          // redo this step if user fail to connect
          if(!enter.isConnected) {
            this.redo();
          }
        }, BrainGraph.container)
      }

      // handles user quick connect
      this.once('browser.opened', async e => {
        this.cursor.fadeOut();

        this.banner.push("Oops... you just performed a shortcut to add block.")
          .push('This is an advance feature in later tutorial.')
        await this.banner.start();

        this.banner.info('Click the close button and try again...')
        this.cursor.moveTo('close-browser-button', 'right');

        this.once('browser.closed', this.redo);
      })

      this.once('execution.connected', data => {
        if(data.source.node == clickEventBlock.node && data.targetNode == moveToBlock.node) {
          this.next();
        }
      }, clickEventBlock.node)
    });

    this.addStep(async () => {
      const moveToBlock = this.getBlock('Move To')
      const positionInputElement = this.getInputPinElement(moveToBlock, 'position');
      const positionInpuPin = moveToBlock.inputPins.get('position')
      
      this.banner.push('Now, when you click the puppet it will move to somewhere')
        .push('We can specify the exact position in <b>position<b> input', () => {
          this.cursor.indicate(positionInputElement);
          positionInpuPin.expand();
        })
        .push('However, if you set the position here', () => {
          positionInpuPin.expand();
        })
        .push('Puppet will always go to this position')
        .push('This is call <b>hard coding</b>, and quite boring.')
        .push('We can introduce some randomness')
        .push('Since a position consist 2 fields: <b>x</b> and <b>y</b>')
        .push('If we make them random numbers.')
        .push('When <b>Move To</b> block is triggered by the click event.')
        .push('The puppet will then move to a random location')
        .push("Let's do it now...")
      await this.banner.start();

      positionInpuPin.collapse();

      this.next();
    })

    this.addStep(this.findBlockStep('Random Integer'))

    var randomXBlock = null;
    this.addStep(async (block) => {
      randomXBlock = block;

      this.banner.push('OK, you have a <b>Random Integer</b> block for <b>x</b> field of a position')
        .push('We need another <b>Random Integer</b> block for <b>y</b>')
      await this.banner.start();

      this.next()
    })

    this.addStep(this.findBlockStep('Random Integer'))

    var randomYBlock = null;
    this.addStep(async (block) => {
      randomYBlock = block;
      
      this.banner.push('Now, <b>Random Integer</b> has 2 inputs: <b>min</b> and <b>max</b>')
        .push('The random number generated will always inbetween min and max range')
        .push('The <b>min</b> input by default is 0 which is good to go', () => {
          randomXBlock.inputPins.get('min').expand();
          this.cursor.indicate(this.getInputPinElement(randomXBlock, 'min'))
        })
        .push('You can specify a <b>max</b> value', () => {
          randomXBlock.inputPins.get('max').expand();
          this.cursor.indicate(this.getInputPinElement(randomXBlock, 'max'))
        })
        .push("Set max to 1024")
      await this.banner.start();

      this.banner.info('Set max to 1024, the stage width')

      this.nextWhen('gadget.state.change', randomXBlock.inputPins.get('max').gadget);
    })

    this.addStep(async () => {
      this.banner.push("Set the second <b>Random Integer</b> block's max to 768.", () => {
          randomYBlock.inputPins.get('max').expand();
          this.cursor.indicate(this.getInputPinElement(randomYBlock, 'max'))
        })
      await this.banner.start();

      this.banner.info('Set max to 768, the stage height')

      this.nextWhen('gadget.state.change', randomYBlock.inputPins.get('max').gadget);
    })

    this.addStep(async () => {
      this.banner.push("Great, randomness are all ready", () => {
          randomXBlock.inputPins.get('min').expand();
          randomXBlock.inputPins.get('max').expand();
          randomYBlock.inputPins.get('min').expand();
          randomYBlock.inputPins.get('max').expand();
        })
        .push('Now, we need to combine the random x value...', () => {
          this.cursor.indicate(this.getOutputPinElement(randomXBlock, 'value'))
        })
        .push('and random y value into a proper position.', () => {
          this.cursor.indicate(this.getOutputPinElement(randomYBlock, 'value'))
        })
        .push('<b>Make Position</b> block comes to rescue!')
      await this.banner.start();
      this.next();
    })
    
    this.addStep(this.findBlockStep('Make Position'))

    var makePositionBlock = null;
    this.addStep(async (block) => {
      makePositionBlock = block;

      this.banner.push("We are almost there, let's connect everything together!")
      await this.banner.start();

      this.next();
    })

    this.addStep(() => {
      this.connectData(randomXBlock, 'value', makePositionBlock, 'x')
    })

    this.addStep(() => {
      this.connectData(randomYBlock, 'value', makePositionBlock, 'y')
    })

    this.addStep(() => {
      const moveToBlock = this.getBlock('Move To')
      this.connectData(makePositionBlock, 'position', moveToBlock, 'position')
    })

    this.addStep(async () => {
      this.banner.push("Well done, Let's get back to the stage to test our game")
      await this.banner.start();

      this.banner.info('Click the back to stage button.')

      let modeBtn = document.getElementById('mode-button');
      this.cursor.moveTo(modeBtn, 'bottom');

      this.nextWhen('graph.closed')
    })

    this.addStep(async () => {
      this.banner.info('Click the play button.');
      this.cursor.moveTo('debug-button', 'left');

      this.once('game.start', async e => {
        this.banner.push("Try it, everytime you click the puppet...")
          .push("It should move to a random location.")
        await this.banner.start();

        this.next();
      }, Hub.activity)
    })
  }
}

const tutorial = new UserInteravtionTutorial();
export default tutorial;