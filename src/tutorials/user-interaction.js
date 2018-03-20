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
      if(isMobile) {
        this.banner.push("We are going to create a fat cat escapes from your mouse click")
      }
      else {
        this.banner.push("We are going to create a fat cat escapes from your finger")
      }
      await this.banner.start();
      
      this.banner.info('Open the puppet brain');

      this.cursor.moveToActor(actor, 'right');
      await this.waitUntil('actor.selection.change', ActorSelection);

      this.cursor.goto('mode-button', 'bottom');
      this.nextWhen('graph.opened');
    })

    this.addStep(async () => {
      this.banner.push("Let's add a <b>event</b> block called <b>Click Event</b>")
      await this.banner.start();
      this.next()
    })

    this.addStep(this.findBlockStep('Click Event'))
    
    this.addStep(async (clickBlock) => {
      this.banner.push('You might wondering what is an <b>event</b> block?')
        .push("You've seen <b>Game Event</b> block", () => {
          this.indicateBlock('Game Event')
        })
        .push("and the <b>Click Event</b> block you just added...", () => {
          this.indicateBlock('Click Event')
        })
        .push('Think of <b>event</b> as your morning wake up alarm ⏰...', () => {
          this.cursor.fadeOut()
        })
        .push('That is an <b>event</b> tells you to wake up!')
        .push('Now, the <b>Click Event</b> is the same idea')
        .push('It tells you when the puppet is clicked.')
        .push('More preceicly, it shows you 2 events...')
      
      if(isMobile) {
        this.banner.push('When your finger is <b>down on the puppet</b>', () => {
            this.cursor.indicate(this.getOutPinElement(clickBlock, 'down'))
          })
          .push('and when your finger is <b>released from the puppet</b>', () => {
            this.cursor.indicate(this.getOutPinElement(clickBlock, 'up'))
          })
      }
      else {
        this.banner.push('When your left mouse is <b>click down on the puppet</b>', () => {
            this.cursor.indicate(this.getOutPinElement(clickBlock, 'down'))
          })
          .push('and when your left mouse is <b>released off from the puppet</b>', () => {
            this.cursor.indicate(this.getOutPinElement(clickBlock, 'up'))
          })
      }
      await this.banner.start();

      this.next(clickBlock);
    });

    this.addStep(async () => {
      this.banner.push(`The idea is when your ${isMobile? 'finger' : 'mouse'} is down on the puppet, it runs away.`)
        .push("You need an another block called <b>Move To</b> to make it happen.")
      await this.banner.start();

      this.next()
    })

    this.addStep(this.findBlockStep('Move To'))

    this.addStep(async (block) => {
      this.banner.push("It is a good habit to keep puppet's brain clean.")
        .push("Game Event block is not used in this tutorial.")
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

    this.addStep(() => {
      this.connectExecution('Click Event', 'Move To', 'down')
    })

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
        .push('If we make <b>x</b> and <b>y</b> into random numbers.')
        .push('When <b>Move To</b> block is triggered by the click event.')
        .push('The puppet will then move to a random location')
        .push("Let's do it now...")
      await this.banner.start();

      positionInpuPin.collapse();

      this.next();
    })

    this.addStep(this.findBlockStep('Random Integer'))

    var randomBlock = null;
    this.addStep(async (block) => {
      randomBlock = block;
      
      let maxValue = Math.min(Math.min(window.innerWidth, window.innerHeight), 768)
      
      this.banner.push('This block generate a random integer...')
        .push('Inbetween min...', () => {
          randomBlock.inputPins.get('min').expand();
          this.cursor.indicate(this.getInputPinElement(randomBlock, 'min'))
        })
        .push('and max', () => {
          randomBlock.inputPins.get('max').expand();
          this.cursor.indicate(this.getInputPinElement(randomBlock, 'max'))
        })
        .push(`Let's set max to ${maxValue}`)
      await this.banner.start();

      this.banner.info(`Set max to ${maxValue}`)

      this.nextWhen('gadget.state.change', randomBlock.inputPins.get('max').gadget);
    })

    this.addStep(async () => {
      this.banner.push("Great, randomness is ready", () => {
          randomBlock.inputPins.get('min').expand();
          randomBlock.inputPins.get('max').expand();
        })
        .push('Now, we need to make a position using the generated random number')
        .push('The <b>Make Position</b> block comes to rescue!')
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
      this.connectData(randomBlock, 'value', makePositionBlock, 'x')
    })

    this.addStep(() => {
      this.connectData(randomBlock, 'value', makePositionBlock, 'y')
    })

    this.addStep(async () => {
      this.banner.push('Notice that, you can plug the output data to multiple inputs.')
      await this.banner.start();

      this.next();
    })

    this.addStep(() => {
      const moveToBlock = this.getBlock('Move To')
      this.connectData(makePositionBlock, 'position', moveToBlock, 'position')
    })

    this.addStep(async () => {
      this.banner.push("Well done, Let's get back to the stage to test our game")
      await this.banner.start();

      this.backToStage();
      this.startGame();

      this.next()
    })

    this.addStep(async () => {
      this.banner.push("Try it, everytime you click the puppet.")
        .push("It should move to a random location.")
      await this.banner.start();

      this.banner.info(`${isMobile ? 'tap' : 'click'} the puppet`);

      this.delayNext(8000);
    })

    this.addStep(async () => {
      this.banner.push("Well done! You have successfully added user interaction to this puppet!")
        .push("You can challenge yourself by adding <b>Animation</b> block to change animation.")
        .push("Keep learning!")
      await this.banner.start();

      this.next();
    })
  }
}

const tutorial = new UserInteravtionTutorial();
export default tutorial;