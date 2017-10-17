import Selection from './Selection';

export default class Stage extends PIXI.Container
{
  constructor(width, height) {
    super();

    this.stageWidth = width;
    this.stageHeight = height;

    Selection.init(this);
  }
}