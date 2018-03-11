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

    const actorPod = await API.getPuppet('SYrH8lWcRl6VmBakJmo3')
    let importActor = new ActorImporter(Hub.activity);
    let actor = await importActor.start(actorPod)

    this.addStep(async () => {
      this.banner.push('Hi again!')
        .push("Allow me to show you how to add user interactions.")
      await this.banner.start();
      
      this.banner.info('Open the brain of the mouse');

      this.cursor.moveToActor(actor, 'right');
      await this.waitUntil('actor.selection.change', ActorSelection);

      this.cursor.goto('mode-button', 'bottom');
      this.nextWhen('graph.opened');
    })

    this.addStep(async () => {
      this.banner.push("It is a good habit to keep the brain clean.")
        .push("Let's delete the Game Event block");
      await this.banner.start();
      this.next();
    })

    this.addStep(() => {
      this.banner.info('Select Game Event block')

      let block = this.getBlock('Game Event');
      this.cursor.moveToBlock(block, 'bottom');

      this.when('block.selection.change', async (selected) => {
        if(selected) {    
          this.banner.push("To delete the Game Event block, you can either...")
            .push("Click the delete button, or...")
            .push("Or hit delete key on the keyboard")
          await this.banner.start();

          this.cursor.moveTo('delete-button', 'left');

          this.banner.info('Delete Game Event block')
        }
        else {
          this.redo();
        }
      }, GraphSelection)

      this.nextWhen('block.deleted', BrainGraph);
    })
    
    this.addStep(async () => {
      this.banner.push("Great, now the brain is cleared")
            .push("Let's add a <b>Click Event</b> block which handles user interaction", true)
      await this.banner.start();

      this.banner.info('Add a <b>Click Event</b> block', true)
      this.cursor.moveTo('add-button', 'bottom')

      this.nextWhen('browser.opened')
    });
  }
}

const tutorial = new UserInteravtionTutorial();
export default tutorial;