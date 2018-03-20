import Tutorial from './Tutorial';
import ActorSelection from '@/editor/objects/ActorSelection';
import TutorialBanner from './TutorialBanner';
import { isMobile } from '@/utils/utils';

class PainterTutorial extends Tutorial
{
  constructor() {
    super();
  }

  init() {
    super.init();

    const canvasButton = this.getCanvasActorButton();
    
    this.addStep(async () => {
      this.banner.push("Hello again!")
        .push("Let's make a painter program together!")
      await this.banner.start();

      this.next();
    })

    this.addStep(async () => {
      this.cursor.indicate(canvasButton)
      this.banner.push("On the left is the <b>canvas button</b>")
      await this.banner.start();

      if(isMobile) {
        this.banner.info('Press and hold canvas button to open its brain');
      }
      else {
        this.banner.info('Double click canvas button to open its brain');
      }
      this.cursor.moveTo(canvasButton, 'bottom')

      this.nextWhen('graph.opened');
    })

    this.addStep(async () => {
      this.banner.push('Same as before, you can define the paint logic in canvas brain')
        .push('There is a new <b>Game Loop</b> block')
        .push('and it is in green color')
        .push('You probably remember previous tutorials also has some green blocks')
        .push('Different category of blocks has different color.')
        .push('This one is in the same category of the <b>Mouse Click</b> and <b>Game Start</b> blocks...')
        .push('which you have seen in the previous tutorials.')
        .push('And you are right, it is a <b>event</b> type block')
        .push('More importantly, it is the <b>heart beats</b>💓 of the game!')
        .push('Because it is a event block, it is also trying to tell you something...')
        .push("It tells you when the heart beat is happened.")
        .push("Actually, the heart beats so fast!")
        .push("Usually around ⏲️<b>60 times per second</b>!")
      await this.banner.start();
      this.next();
    })

    var gameLoopBlock = null;
    this.addStep(async () => {
      gameLoopBlock = this.getBlock('Game Loop');
      this.cursor.indicate(this.getOutPinElement(gameLoopBlock, 'tick'))

      this.banner.push("See the white pin called <b>tick</b>?")
        .push("Every heart beat will trigger the <b>tick</b> pin")
        .push("We can connect <b>tick</b> with other block to make cool stuff")
        .push("In this case, a painter, and we need another block called <b>Line To</b>")
      await this.banner.start();

      this.next();
    })

    this.addStep(this.findBlockStep('Line To'))

    var lineToBlock = null
    this.addStep(async (block) => {
      lineToBlock = block
      this.banner.push("<b>Line To</b> block will help you to draw a line.")
        .push('More preciecly, draw a line to a specific location')
      await this.banner.start();

      this.cursor.indicate(this.getInputPinElement(lineToBlock, 'position'))

      this.banner.push("You can specify the location in its input <b>position</b> pin.")
        .push('However, if we know our mouse or finger location on the screen')
        .push('We can plug them into the <b>position</b> input pin,')
        .push('and it will draw line towards our mouse or finger location')
        .push('This is the core idea of any painter program!')
        .push("Now, <b>Mouse Position</b> block comes to rescue!")
      await this.banner.start();

      this.next();
    })

    this.addStep(this.findBlockStep('Mouse Position'))

    var mousePositionBlock = null;
    this.addStep(async (block) => {
      mousePositionBlock = block
      this.banner.push("Let's plug the mouse position to the position input of the <b>Line To</b> block")
      await this.banner.start();
      this.next();
    })

    this.addStep(() => {
      this.connectData(mousePositionBlock, 'position', lineToBlock, 'position')
    })

    this.addStep(async (block) => {
      mousePositionBlock = block
      this.banner.push("Great! Let's connect <b>Game Loop</b> and <b>Line To</b> together as well.")
      await this.banner.start();

      this.next();
    })

    this.addStep(() => {
      this.connectExecution(gameLoopBlock, lineToBlock, 'tick')
    });

      this.addStep(async () => {
        this.banner.push("Let's get back to stage to see what will happen")
        await this.banner.start();

        this.backToStage();
        this.startGame();

        this.next();
      })

      this.addStep(async () => {
        if(isMobile) {
          this.banner.info('Try finger down on the screen to draw lines');
        }
        else {
          this.banner.info('Try move the mouse on the canvas to draw lines');
        }

        this.delayNext()
      })

      this.addStep(async () => {
        this.banner.push("Well done! You have created a simple painter!")
          .push("You can challenge yourself by adding <b>Stroke Style</b> block to change line width and color")
          .push("I'll let you play around now...")
        await this.banner.start();

        this.next();
      })
  }
}

const tutorial = new PainterTutorial();
export default tutorial;