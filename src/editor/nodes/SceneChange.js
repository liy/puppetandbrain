import { Task, Template as ParentTemplate } from "./Task";
import DataType from "../data/DataType";

NodeTemplate.SceneChange = {
  ...ParentTemplate,
  className: 'SceneChange',
  name: 'Scene Change',
  inputs: [{
    name: 'creation id',
    descriptor: {
      type: DataType.STRING,
    }
  }],
  elementClass: ['utility'],
  category: 'Utilities'
}

export default class SceneChange extends Task
{
  constructor(id, activity) {
    super(id, activity);

    this.onTransitionEnd = this.onTransitionEnd.bind(this);
  }

  init(pod) {
    super.init(pod);

    ActivityManager.stage.on('game.stop', this.stop, this);
    ActivityManager.stage.on('game.start', this.start, this);
    
    this.stageElement = ActivityManager.stage.element;
    this.maskCircle = document.getElementById('mask-circle');
    
    
  }

  stop() {
    this.maskCircle.classList.remove('circle-mask-close');
    this.maskCircle.classList.remove('circle-mask-open');
    this.stageElement.classList.remove('masking')

    this.maskCircle.removeEventListener('animationend', this.onTransitionEnd)
    this.maskCircle.removeEventListener('webkitAnimationEnd', this.onTransitionEnd)
    this.maskCircle.removeEventListener('MSAnimationEnd', this.onTransitionEnd)
  }

  start() {
    this.maskCircle.addEventListener('animationend', this.onTransitionEnd)
    this.maskCircle.addEventListener('webkitAnimationEnd', this.onTransitionEnd)
    this.maskCircle.addEventListener('MSAnimationEnd', this.onTransitionEnd)
  }

  run() {
    super.run();

    this.maskCircle.classList.add('circle-mask-close');
    this.stageElement.classList.add('masking')

    // TODO: auto start
  }

  onTransitionEnd(e) {
    this.maskCircle.removeEventListener('animationend', this.onTransitionEnd)
    this.maskCircle.removeEventListener('webkitAnimationEnd', this.onTransitionEnd)
    this.maskCircle.removeEventListener('MSAnimationEnd', this.onTransitionEnd)

    
    router.navigate(`/creations/${this.inputs.value('creation id')}`);

    setTimeout(() => {
      this.maskCircle.classList.remove('circle-mask-close');
      this.maskCircle.classList.add('circle-mask-open');
    }, 1000)
  }
}