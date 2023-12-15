import { AbstractStorage } from './AbstractStorage';
import { Migrations } from './Migration';

export class DbStorage<Value extends { id: Id }, Id extends string | number> extends AbstractStorage<Value, Id, IDBDatabase> {
  readonly #dbName: string;
  readonly #storeName: string;
  readonly #migrations: Migrations;

  constructor(dbName: string, storeName: string, migrations: Migrations) {
    super();
    this.#dbName = dbName;
    this.#storeName = storeName;
    this.#migrations = migrations;
  }

  init(): Promise<IDBDatabase> {
    return super.init().then(() => {
      return new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open(this.#dbName, this.#migrations.length);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);

        request.addEventListener('upgradeneeded', async ({ oldVersion }) => {
          const migrationsToApply = this.#migrations.slice(oldVersion);

          for (const migration of migrationsToApply) {
            await migration(request.transaction!);
          }
        }, { once: true });
      });
    });
  }

  get(id: Id): Promise<Value | null> {
    return this.#transaction<Value>('readonly', [this.#storeName], (transaction) => {
      const store = transaction.objectStore(this.#storeName);

      return store.get(id);
    });
  }

  getAll(): Promise<Value[]> {
    return this.#transaction<Value[]>('readonly', [this.#storeName], (transaction) => {
      const store = transaction.objectStore(this.#storeName);

      return store.getAll();
    });
  }

  write(data: Omit<Value, 'id'> & { id?: Id | undefined; }, id?: Id | undefined): Promise<Id> {
    return this.#transaction<Id>('readwrite', [this.#storeName], (transaction) => {
      const store = transaction.objectStore(this.#storeName);

      return store.put(data, id);
    });
  }

  delete(id: Id): Promise<void> {
    return this.#transaction<void>('readwrite', [this.#storeName], (transaction) => {
      const store = transaction.objectStore(this.#storeName);

      return store.delete(id);
    });
  }

  #transaction<T>(
    type: 'readonly' | 'readwrite',
    storeNames: string[],
    action: (transaction: IDBTransaction) => IDBRequest,
  ): Promise<T> {
    return this.ready.then((db) => {
      const transaction = db.transaction(storeNames, type);
      const request = action(transaction);

      return new Promise<T>((resolve, reject) => {
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
      });
    });
  }
}
