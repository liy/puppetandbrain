import ADataPin from "./ADataPin";

export default class AOutputPin extends ADataPin
{
  constructor(name) {
    super(name, 'out')
  }

  template(pod) {

  }
}