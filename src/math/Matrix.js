export default class Matrix extends PIXI.Matrix
{
  constructor(a, b, c, d, tx, ty) {
    super(a, b, c, d, tx, ty);
  }

  toCss() {
    return `matrix(${this.a},  ${this.b}, ${this.c}, ${this.d}, ${this.tx}, ${this.ty})`
  }
}