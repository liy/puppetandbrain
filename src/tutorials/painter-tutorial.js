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

    this.addStep(async () => {
      const gameLoopBlock = this.getBlock('Game Loop');
      this.cursor.indicate(this.getOutPinElement(gameLoopBlock, 'tick'))

      this.banner.push("See the white pin called <b>tick</b>?")
        .push("Every heart beat will trigger the <b>tick</b> pin")
        .push("We can connect <b>tick</b> with other block to make cool stuff")
        .push("In this case, a painter, and we need another block called <b>Line To</b>")
      await this.banner.start();

      this.next();
    })

    this.addStep(this.findBlockStep('Line To'))

    this.addStep(async (lineToBlock) => {
      this.banner.push("<b>Line To</b> block will help you to draw a line.")
        .push('More preciecly, draw a line to a specific location')
      await this.banner.start();

      this.cursor.indicate(this.getInputPinElement(lineToBlock, 'position'))

      this.banner.push("You can specify the location in its input <b>position</b> pin.")
        .push('However, if we know our mouse or finger location on the screen')
        .push('We can plug them into the <b>position</b> input pin,')
        .push('and it will draw line towards our mouse or finger location')
        .push('This is the core idea of any painter program!')
        .push("<b>Mouse Position</b> block comes to rescue!")
      await this.banner.start();

      this.next();
    })

    this.addStep(this.findBlockStep('Mouse Position'))

    this.addStep(async (mousePositionBlock) => {
      this.banner.push("Co")
    })
  }
}

const tutorial = new PainterTutorial();
export default tutorial;