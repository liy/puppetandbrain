import Actor from "./Actor";

export default class Trigger extends Actor
{
  constructor() {
    super();

    let g = new PIXI.Graphics();
    this.addChild(g);

    g.beginFill(0xFF9900, 1);
    g.drawCircle(0, 0, 100);
    g.endFill();

    this.interactive = true
  }

  over(e) {
    console.log('move')
  }

  out(e) {
    console.log('out')
  }
}