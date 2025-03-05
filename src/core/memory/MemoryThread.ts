import { Base } from '../base';

export class MemoryThread extends Base {
  constructor(
    public id: string,
    public createdAt: string = '',
    public name: string = '',
  ) {
    super();
  }
}
