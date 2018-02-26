const filters = require('pixi-filters');
import './ChoiceBox.scss';
import Actor from "./Actor";
import BoxComponent from "../components/BoxComponent";
import GraphicsComponent from "../components/GraphicsComponent";
import DataType from '../data/DataType';
import IconStore from '../ui/IconStore';
import html2canvas from 'html2canvas';
import ImageLoader from '../resources/ImageLoader';
import Vec2 from '../math/Vec2';
import Matrix from '../math/Matrix';
import PlaceHolderComponent from '../components/PlaceHolderComponent';
import LoaderBucket from '../resources/LoaderBucket';
import { getMimeType } from '@/utils/utils';

export default class ChoiceBox extends Actor
{
  constructor(id, activity) {
    super(id, activity);
    
    this.selectOutline = new filters.OutlineFilter(4, 0xc95ce8)
    this.hoverOutline = new filters.OutlineFilter(3, 0xdbace8)
  }

  async preload(pod) {
    let pos = pod.position || { x: aroundAt(ActivityManager.stage.stageWidth/2), y: aroundAt(ActivityManager.stage.stageHeight/2) };
    this.position = new Vec2(pos);
    this.rotation = pod.rotation || 0;
    this.scale = new Vec2(pod.scale || {x:1,y:1});

    this.addComponent('placeholder', new PlaceHolderComponent());
    
    let loader = new LoaderBucket(this.activity.resources);
    let promises = pod.userFiles.map(async entry => {
      loader.add(entry.path, entry.url, entry.contentType)
    });
    
    // default sprite...
    let url = require('!file-loader!@/assets/icons/choice-box-icon.svg');
    promises.push(loader.add(url, url, getMimeType('svg')));

    await loader.start();
    this.removeComponent('placeholder');
  }

  init(pod={}) {
    super.init(pod);

    this.width = pod.width || 200;
    this.height = pod.height || 200;
    this.padding = pod.padding || 0;

    let boxWidth = this.width-this.padding*2;
    let boxHeight = this.height-this.padding*2;

    this.content = this.addComponent('content', new BoxComponent(boxWidth, boxHeight));
    this.content.on('input', this.onInput, this);
    this.box = this.addComponent('box', new GraphicsComponent());


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
      data: pod.properties.boxColor || 0xFFFFFF,
      propertyName: 'boxColor',
      descriptor: {
        friendlyName: 'box color',
        gadgetClassName: 'ColorButton',
        type: DataType.COLOR,
        iconID: IconStore.COLOR
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
    this.properties.add({
      data: pod.properties.image || {},
      propertyName: 'image',
      descriptor: {
        type: DataType.IMAGE,
        iconID: "🖼️"
      }
    });
  }

  onInput(text) {
    this.properties.get('text').data = text;
  }

  hitTest(x, y) {
    return this.box.graphics.containsPoint(new PIXI.Point(x,y));
  }

  select() {
    super.select();

    this.box.graphics.filters = [this.selectOutline]
    // bring it to front
    ActivityManager.stage.addChild(this.box.container);
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
    this.box.graphics.beginFill(c, 1);
    this.box.graphics.drawRoundedRect (-this.width/2, -this.height/2, this.width, this.width, 10);
    this.box.graphics.endFill();
  }

  get boxColor() {
    return this.properties.get('boxColor').data;
  }

  set textColor(c) {
    this.content.textColor = c;
  }

  get textColor() {
    return this.properties.get('textColor').data;
  }

  set image(fileData) {
    ImageLoader.fetch(fileData).then(({image, blob, url}) => {
      this.content.imageUrl = image.src;
    }).catch(e => {
      this.content.imageUrl = require('!file-loader!@/assets/icons/choice-box-icon.svg');
    })
  }

  get image() {
    // return this.content.imageUrl
    return this.properties.get('image').data
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
    let texture = Editor.renderer.generateTexture(this.box.container);
    let pixiCanvas = Editor.renderer.extract.canvas(texture);

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

      // Since the pixi
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