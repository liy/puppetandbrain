import Component from './Component';
import ContainerComponent from './ContainerComponent';

const IMG = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjAwJyBoZWlnaHQ9JzIwMCcgZmlsbD0iI0NDQ0NDQyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEwMCAxMDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwYXRoIGQ9Ik02My41NjgsNDMuOTczYzUuNTEyLTUuNDQzLDExLjc1LTExLjYwNCwxMS45MDYtMjAuODA0YzAuMDE3LTAuMTE3LDAuMDI1LTAuMjM2LDAuMDI1LTAuMzU4VjEwaDExLjA2M1YwaC0yLjVIMTUuOTM4aC0yLjUgIHYxMEgyNC41djEyLjgxMWMwLDAuMTEyLDAuMDA3LDAuMjIzLDAuMDIyLDAuMzMxYzAuMTIsOS41MjEsNi42OTcsMTUuOTIyLDEyLjUxLDIxLjU3OWMxLjAzNywxLjAwOSwxLjE1NywzLjQyOSwxLjE1Nyw1LjE2MSAgYzAsMS4wMzUsMCw0LjE4Ni0xLjMwNiw1LjQzOGMtNS40NjcsNS4yMzctMTIuMjYsMTEuNzQ2LTEyLjM2MiwyMS41MzdjLTAuMDE0LDAuMTA4LTAuMDIxLDAuMjE5LTAuMDIxLDAuMzMxVjkwSDEzLjQzOHYxMGgyLjUgIGg2OC4xMjVoMi41VjkwSDc1LjVWNzcuMTg4YzAtMC4xMTEtMC4wMDgtMC4yMi0wLjAyMS0wLjMyN2MtMC4xMDQtOS45MDMtNy4yMDEtMTYuNjM3LTEyLjM5My0yMS41NjMgIGMtMC45MTEtMC44NjUtMS4zNzQtMi43OTktMS4zNzQtNS43NDdjMC0xLjgwOSwwLjA3MS0zLjgwOSwwLjkxNy00LjY0OUw2My41NjgsNDMuOTczeiBNNjUuNDc5LDc2Ljk2NmwwLjAwNiwwLjU4MmwwLjAxNSwwLjExN1Y3OCAgaC0zMXYtMC4zMjdsMC4wMTUtMC4xMTNsMC4wMDYtMC41OTljMC4wNTQtNS4xOTcsMy43MS05LjA4Myw5LjI4My0xNC40MjNjMy43OTQtMy42MzgsNC4zNDgtOC42NjIsNC4zODEtMTIuMjdoMy41MzIgIGMwLjA3NSwzLjY5MiwwLjc0LDguNzI5LDQuNDg2LDEyLjI4NUM2MC41MjMsNjYuNjUyLDY1LjQyLDcxLjI5OCw2NS40NzksNzYuOTY2eiBNMzYuOTc0LDI5Ljg1NCAgYy0xLjU1NC0yLjIzNC0yLjQyMi00LjM5NS0yLjQ1My02LjgzOGwtMC4wMDgtMC42MWwtMC4wMTMtMC4xVjEwaDMxdjEyLjI4M2wtMC4wMTMsMC4wOTRsLTAuMDExLDAuNjIxICBjLTAuMDQyLDIuNDUxLTAuOTQ4LDQuNjA0LTIuNTYxLDYuODU1SDM2Ljk3NHoiLz48L3N2Zz4=";

export default class PlaceHolderComponent extends ContainerComponent
{
  constructor(dimension) {
    super();

    this.targetRotation = 0;

    // FIXME: change to svg!!! 
    this.hourGlass = new PIXI.Sprite.fromImage(IMG);
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
    }, 1000);
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