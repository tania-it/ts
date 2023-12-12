
export abstract class AbstractStorage<Value extends { id: Id }, Id extends number | string, Init = void> {
    readonly #ready: Promise<Init>;
  
    constructor() {
      this.#ready = this.init();
    }
  
    get ready(): Promise<Init> {
      return this.#ready;
    }
  
    init(): Promise<Init> {
      return Promise.resolve() as Promise<Init>;
    }
  
    abstract get(id: Id): Promise<Value | null>;
  
    abstract getAll(): Promise<Value[]>;
  
    abstract write(data: Omit<Value, 'id'> & { id?: Id }, id?: Id): Promise<Id>;
  
    abstract delete(id: Id): Promise<void>;
  
  }
  