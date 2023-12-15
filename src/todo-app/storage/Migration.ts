export interface Migration {
  (transaction: IDBTransaction): void | Promise<void>;
}

export type Migrations = [Migration, ...Migration[]];
