import Actor from "./Actor";
import ContainerComponent from "../components/ContainerComponent";
import Vec2 from "../math/Vec2";
import ActorSelection from "./ActorSelection";


// Special actor exist by default in the stage for drawing graphics
// which cannot be dragged
export default class CanvasActor extends Actor
{
  constructor(id, activity) {
    super(id, activity)

    this.pen = {x:0, y:0};

    this.container = this.addComponent('container', new ContainerComponent()).container;
    this.container.interactiveChildren = true;

    this.dragEnabled = false;
  }

  init(pod={}) {
    super.init(pod);

    this.name = 'Canvas'

    this.width = pod.width || 1024-4;
    this.height = pod.height || 768-4;

    const pos = pod.position || {
      x: (Hub.stage.stageWidth-this.width)/2,
      y: (Hub.stage.stageHeight-this.height)/2
    }
    this.position = new Vec2(pos);
    
    this.catcher = new PIXI.Graphics();
    this.catcher.interactive = true;
    this.catcher.beginFill(0, 0);
    this.catcher.drawRect(0, 0, this.width, this.height);
    this.catcher.endFill();
    this.container.addChild(this.catcher)
    this.catcher.on('mousedown', ActorSelection.deselectAll, ActorSelection);

    this.graphics = new PIXI.Graphics();
    this.graphics.interactive = false;
    this.container.addChild(this.graphics);

    this.clear();
  }

  select() {
    // cannot select canvas
  }

  onContextMenu(e) {
    // no right click
  }

  clear() {
    this.graphics.clear();
  }
  
  penTo(position) {
    console.log(this.pen)
    this.pen = position;
    this.graphics.moveTo(this.pen.x, this.pen.y)
  }

  fillStyle(color, alpha) {
    this.graphics.beginFill(color, alpha)
  }

  drawCircle(radius) {
    this.graphics.drawCircle(this.pen.x, this.pen.y, radius);
  }

  drawSquare(size) {
    this.graphics.drawRect(this.pen.x, this.pen.y, size, size);
  }
}