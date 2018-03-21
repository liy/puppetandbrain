import './TextWidget.scss';
import Actor from "./Actor";
import DataType from '../data/DataType';
import IconStore from '../ui/IconStore';
import html2canvas from 'html2canvas';
import Vec2 from '../math/Vec2';
import Matrix from '../math/Matrix';
import { aroundAt } from '@/utils/utils';
import TextComponent from '../components/TextComponent';

export default class TextWidget extends Actor
{
  constructor(id, activity, pod) {
    super(id, activity, pod);
  }

  init(pod={}) {
    super.init(pod);

    this.width = pod.width || 200;
    this.height = pod.height || 200;
    this.padding = pod.padding || 0;

    let boxWidth = this.width-this.padding*2;
    let boxHeight = this.height-this.padding*2;

    this.content = this.addComponent('content', new TextComponent(''));
    this.content.on('input', this.onInput, this);

    // just make code a little bit easier to read by define a properties field
    // if it does not exist
    pod.properties = pod.properties || {};
    // setup properties
    this.properties.add({
      data: pod.properties.text || '',
      propertyName: 'text',
      descriptor: {
        iconID: '🏷️',
        type: DataType.STRING
      }
    })
    this.properties.add({
      data: pod.properties.textColor || 0x000000,
      propertyName: 'textColor',
      descriptor: {
        friendlyName: 'text color',
        gadgetClassName: 'ColorButton',
        type: DataType.COLOR,
        iconID: IconStore.COLOR
      }
    });

    this.emit('actor.ready', this);
  }

  onInput(text) {
    console.log(text)
    this.properties.get('text').data = text;
  }

  hitTest(x, y) {

  }

  select() {
    super.select();

  }

  mouseOver(e) {
    if(!this.selected) {

    }
  }

  mouseOut(e) {

  }

  set textColor(c) {
    this.content.textColor = c;
  }

  get textColor() {
    return this.properties.get('textColor').data;
  }

  set text(text) {
    this.content.text = text;
  }

  get text() {
    return this.properties.get('text').data;
  }

  async snapshot() {
    let fileData = this.properties.get('image').data;

    // do not show filters in snapshot
    let outlineFilters = this.box.container.filters;
    this.box.container.filters = []

    // this texture does not contains any transformation.
    // the image is later transformed manually use actor's transformation
    let texture = Hub.stage.renderer.generateTexture(this.box.container);
    let pixiCanvas = Hub.stage.renderer.extract.canvas(texture);

    this.box.container.filters = outlineFilters

    return html2canvas(this.content.element, {
      backgroundColor: null,
      // width: 200/this.scale.x,
      // height: 200/this.scale.y,
      // Load the cross domain images!!!
      // As all the authoring time data will be uploaded to the server,
      // there will be no issue to access cors image.
      allowTaint: true,
    }).then(domCanvas => {

      let canvas = document.createElement('canvas')
      canvas.width = domCanvas.width;
      canvas.height = domCanvas.height;
      let context = canvas.getContext('2d');

      let m = new Matrix();
      // rotate, scale at pivot 0.5, 0.5
      m.translate(-0.5*this.width, -0.5*this.height);
      // Note this does not consider the box component transformation...
      // only actor transformation.
      m.rotate(this.rotation);
      m.scale(this.scale.x, this.scale.y);
      // translate back to the centre of the domCanvas
      m.translate(canvas.width/2, canvas.height/2);
      // transform the context ready for draw the canvas
      context.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
      context.drawImage(pixiCanvas, 0, 0)

      // draw dom canvas, which is above pixi canvas
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.drawImage(domCanvas, 0, 0)

      return canvas;
    })
  }
} 