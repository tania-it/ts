
export abstract class AbstractStorage<
  Value extends { id: Id },
  Id extends number | string,
  Init = void,
  InitParams = void,
> {
  readonly #ready: Promise<Init>;

  constructor(initParams: InitParams) {
    this.#ready = this.init(initParams);
  }

  get ready(): Promise<Init> {
    return this.#ready;
  }

  init(params: InitParams): Promise<Init> {
    return Promise.resolve() as Promise<Init>;
  }

  abstract get(id: Id): Promise<Value | null>;

  abstract getAll(): Promise<Value[]>;

  abstract write(data: Omit<Value, 'id'> & { id?: Id }, id?: Id): Promise<Id>;

  abstract delete(id: Id): Promise<void>;

}
