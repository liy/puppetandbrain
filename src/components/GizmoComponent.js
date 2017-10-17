import Component from './Component';

export default class GizmoComponent extends Component
{
  constructor(type) {
    super();
    this.type = type;
  }

  set type(v) {
    this.gizmoType = v;
  }

  get type() {
    return this.gizmoType;
  }
}