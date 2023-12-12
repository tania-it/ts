import { AbstractStorage } from './AbstractStorage';

export class BrowserLocalStorage<Value extends { id: Id }, Id extends string | number> extends AbstractStorage<Value, Id> {
  readonly #storageKey: string;
  readonly #idGenerator: () => Id;

  constructor(storageKey: string, idGenerator: () => Id) {
    super();
    this.#storageKey = storageKey;
    this.#idGenerator = idGenerator;
  }

  async get(id: Id): Promise<Value | null> {
    await this.ready;
    const data = this.#extractDataFromStorage();

    return data[id] ?? null;
  }

  async getAll(): Promise<Value[]> {
    await this.ready;
    const data = this.#extractDataFromStorage();

    return Object.values(data);
  }

  async write(value: Omit<Value, 'id'> & { id?: Id }, id?: Id): Promise<Id> {
    await this.ready;
    const data = this.#extractDataFromStorage();
    const definedId = value.id ?? id ?? this.#idGenerator();

    this.#saveDataToStorage({
      ...data,
      [definedId]: {
        ...value,
        id: definedId,
      },
    });

    return definedId;
  }

  async delete(id: Id): Promise<void> {
    await this.ready;
    const data = this.#extractDataFromStorage();

    delete data[id];
    this.#saveDataToStorage(data);
  }

  #extractDataFromStorage(): Record<Id, Value> {
    const storageData = localStorage.getItem(this.#storageKey);

    return storageData ? JSON.parse(storageData) : {};
  }

  #saveDataToStorage(data: Record<Id, Value>): void  {
    const jsonData = JSON.stringify(data);

    localStorage.setItem(this.#storageKey, jsonData);
  }
}
