import { AbstractStorage } from "./AbstractStorage";
import { WithId } from "../models/WithId";
import { Migrations } from "./Migration";


export class DbStorage<Value extends { id: Id }, Id extends string | number> extends AbstractStorage<Value, Id, IDBDatabase> {
    readonly #dbname: string;
    readonly #storeName: string;
    readonly #migrations: Migrations;

    constructor(dbname: string, storeName: string, migrations: Migrations) {
        super();
        this.#dbname = dbname;
        this.#storeName = storeName;
        this.#migrations = migrations;

    }

    init(): Promise<IDBDatabase> {
        return super.init().then(() => {
            return new Promise<IDBDatabase>((resolve, reject) => {
                const request = indexedDB.open(this.#dbname, this.#migrations.length);
                request.onerror = () => reject(request.error);
                request.onsuccess = () => resolve(request.result);
                request.onupgradeneeded = async ({ oldVersion }) => {
                    const migrationsToApply = this.#migrations.slice(oldVersion);

                    for (const migration of migrationsToApply) {
                        await migration(request.transaction!);
                    }
                };
            });
        });

    }

    get(id: Id): Promise<Value | null> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<Value[]> {
        throw new Error("Method not implemented.");
    }
    write(data: Omit<Value, "id"> & { id?: Id | undefined; }, id?: Id | undefined): Promise<Id> {
        const db = this.init();
        db.then(res => {
        let transaction = res.transaction(this.#storeName, 'readwrite');
        transaction.objectStore(this.#storeName).add(data);
        });
       
        //  throw new Error("Method not implemented.");
    }
    delete(id: Id): Promise<void> {
        throw new Error("Method not implemented.");
    }

}


