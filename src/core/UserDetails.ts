import { Base } from './base';

export class UserDetails extends Base {
  constructor(
    public id: string,
    public firstName: string = '',
    public lastName: string = '',
    public email: string = '',
    public additionalAttributes: Record<string, any> = {},
  ) {
    super();
  }
}
