export class Base {
  // Static method to create an instance of any subclass from an object
  public static fromObject<T extends Base>(this: new () => T, data: any): T {
    const instance = new this(); // Create an instance of the subclass
    return instance.from(data) as T;
  }
  public from(data: object): this {
    Object.assign(this, data);
    return this;
  }

  public toDict(): Record<string, any> {
    const dict: Record<string, any> = {};

    for (const key of Object.getOwnPropertyNames(this)) {
      dict[key] = (this as any)[key];
    }

    return dict;
  }

  public toJson(): string {
    return JSON.stringify(this.toDict());
  }
}
