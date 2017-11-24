import GetPropertyBlock from "./GetPropertyBlock";

export default class GetPositionBlock extends GetPropertyBlock
{
  constructor(node) {
    super('position', node);
  }
}