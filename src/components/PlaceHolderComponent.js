import Component from './Component';
import ContainerComponent from './ContainerComponent';
import { Resource } from '../resources/Resource';


export default class PlaceHolderComponent extends ContainerComponent
{
  constructor(dimension) {
    super();

    this.targetRotation = 0;

    // FIXME: change to svg!!! 
    this.hourGlass = new PIXI.Sprite.from(Resource.get('$hourglass'));
    this.hourGlass.pivot.x = 100;
    this.hourGlass.pivot.y = 100;

    dimension = dimension || {x: this.hourGlass.width, y: this.hourGlass.height}; 

    let s = Math.min((dimension.x*0.5)/200, (dimension.y*0.5)/200);

    this.bg = new PIXI.Graphics();
    this.bg.lineStyle(15*s, 0xCCCCCC, 1);
    this.bg.drawRoundedRect(-dimension.x/2, -dimension.y/2, dimension.x, dimension.y, 30*s);
    this.bg.endFill();

    this.hourGlass.scale.y = this.hourGlass.scale.x = s
    
    // show progress
    this.container.addChild(this.bg);
    this.container.addChild(this.hourGlass);
    
    // you cannot interact with place holder
    this.container.interactive = false;
  }

  destroy() {
    super.destroy();
    clearInterval(this.intervalID);
  }

  added() {
    super.added();

    this.intervalID = setInterval(() => {
      this.targetRotation += Math.PI;
    }, 500);
  }

  removed() {
    super.removed();
    clearInterval(this.intervalID);
  }

  updateTransform() {
    this.hourGlass.rotation += (this.targetRotation - this.hourGlass.rotation)/5;
    super.updateTransform();
  }
}