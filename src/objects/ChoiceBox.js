const filters = require('pixi-filters');
import './ChoiceBox.scss';
import Actor from "./Actor";
import BoxComponent from "../components/BoxComponent";
import GraphicsComponent from "../components/GraphicsComponent";
import DataType from '../data/DataType';
import IconStore from '../ui/IconStore';

export default class ChoiceBox extends Actor
{
  constructor(id) {
    super(id);
    
    this.selectOutline = new filters.OutlineFilter(4, 0xc95ce8)
    this.hoverOutline = new filters.OutlineFilter(3, 0xdbace8)
  }

  init(pod={}) {
    super.init(pod);

    this.width = pod.width || 200;
    this.height = pod.height || 200;
    this.padding = pod.padding || 0;

    let boxWidth = this.width-this.padding*2;
    let boxHeight = this.height-this.padding*2;

    this.content = this.addComponent('content', new BoxComponent(boxWidth, boxHeight));
    this.box = this.addComponent('box', new GraphicsComponent());

    console.log(pod)
    
    // just make code a little bit easier to read by define a properties field
    // if it does not exist
    pod.properties = pod.properties || {};
    // setup properties
    this.properties.add({
      value: 0xFFFFFF,
      ...pod.properties.boxColor,
      property: 'boxColor',
      name: 'box color',
      gadgetClass: 'ColorButton',
      iconID: IconStore.COLOR
    })
    this.properties.add({
      value: 0x000000,
      ...pod.properties.textColor,
      property: 'textColor',
      name: 'text color',
      gadgetClass: 'ColorButton',
      iconID: IconStore.COLOR
    });
    console.log(this.properties)
    this.properties.add({
      property: 'image', 
      value: require('!file-loader!../assets/icons/dots.svg'),
      gadgetClass: 'ImageField',
      iconID: "🖼️"
    });
  }

  select() {
    super.select();

    this.box.graphics.filters = [this.selectOutline]
    // bring it to front
    Editor.stage.addChild(this.box.container);
  }

  deselect() {
    super.deselect();
    this.box.graphics.filters = [];
  }

  mouseOver(e) {
    if(!this.selected) {
      this.box.graphics.filters = [this.hoverOutline]
    }
  }

  mouseOut(e) {
    if(!this.selected) {
      this.box.graphics.filters = []
    }
    else {
      this.box.graphics.filters = [this.selectOutline]
    }
    
  }

  set boxColor(c) {
    this._boxColor = c;
    this.box.graphics.beginFill(this.boxColor, 1);
    this.box.graphics.drawRoundedRect (-this.width/2, -this.height/2, this.width, this.width, 10);
    this.box.graphics.endFill();
  }

  get boxColor() {
    return this._boxColor;
  }

  set textColor(c) {
    this.content.textColor = c;
  }

  get textColor() {
    return this.content.textColor;
  }

  set image(url) {
    this.content.imageUrl = url
  }

  get image() {
    return this.content.imageUrl
  }
} 