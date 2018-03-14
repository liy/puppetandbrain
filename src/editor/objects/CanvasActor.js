import Actor from "./Actor";
import ContainerComponent from "../components/ContainerComponent";
import Vec2 from "../math/Vec2";
import ActorSelection from "./ActorSelection";


// TODO: use canvas2D for drawing. PIXI.js graphics drawCircle is extremly slow.
//
// Special actor exist by default in the stage for drawing graphics
// which cannot be dragged
export default class CanvasActor extends Actor
{
  constructor(id, activity) {
    super(id, activity)

    this.pen = {x:0, y:0};

    this.container = this.addComponent('container', new ContainerComponent()).container;

    this.dragEnabled = false;
  }

  init(pod={}) {
    super.init(pod);

    this.name = 'Canvas'

    this.width = pod.width || 1024;
    this.height = pod.height || 768;

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
    this.container.addChild(this.graphics);

    this.lineStyle = {
      width:2,
      color: 0xFF9900,
      alpha: 1
    }

    this.fillStyle = {
      color: 0xFFFFFF,
      alpha: 1
    }
  }

  select() {
    // cannot select canvas
  }

  onContextMenu(e) {
    // no right click
  }

  gameStop() {
    this.clearDraw();
  }

  clearDraw() {
    this.graphics.clear();
  }
  
  penTo(position) {
    this.pen = position;
    this.graphics.moveTo(this.pen.x, this.pen.y)
  }

  drawCircle(radius) {
    this.graphics.beginFill(this.fillStyle.color, this.fillStyle.alpha)
    this.graphics.lineStyle(this.lineStyle.width, this.lineStyle.color, this.lineStyle.alpha)
    this.graphics.drawCircle(this.pen.x, this.pen.y, radius);
  }

  drawSquare(size) {
    this.graphics.beginFill(this.fillStyle.color, this.fillStyle.alpha)
    this.graphics.lineStyle(this.lineStyle.width, this.lineStyle.color, this.lineStyle.alpha)
    this.graphics.drawRect(this.pen.x, this.pen.y, size, size);
  }

  lineTo(position) {
    // console.log(position.x, position.y)
    // console.log(this.fillStyle)
    // console.log(this.lineStyle)
    // this.graphics.beginFill(this.fillStyle.color, this.fillStyle.alpha)
    this.graphics.lineStyle(this.lineStyle.width, this.lineStyle.color, this.lineStyle.alpha)
    this.graphics.lineTo(position.x, position.y)
    // this.penTo(position)
  }
}