import { AbstractStorage } from "./AbstractStorage";

import { WithId } from "../models/WithId";
import { Migrations } from "./Migration";

export class DbStorage<Value extends { id: Id }, Id extends string | number> extends AbstractStorage<Value, Id, IDBDatabase> {
    readonly #dbname : string;
    readonly #storeName :string;
    readonly #migrations : Migrations;

constructor(dbname: string, storeName: string, migrations: Migrations) {
    super();
    this.#dbname = dbname;
    this.#storeName = storeName;
    this.#migrations = migrations;

}
// дописать!!! 
init(): Promise<IDBDatabase> {
    return super.init()
     .then(() => {
       return new Promise<IDBDatabase>((resolve,reject) => {
        const request = indexedDB.open()
       })
     });

}


    get(id: Id): Promise<Value | null> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<Value[]> {
        throw new Error("Method not implemented.");
    }
    write(data: Omit<Value, "id"> & { id?: Id | undefined; }, id?: Id | undefined): Promise<Id> {
        throw new Error("Method not implemented.");
    }
    delete(id: Id): Promise<void> {
        throw new Error("Method not implemented.");
    }

}