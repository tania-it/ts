import { DbStorage } from './DbStorage';
import { Migrations } from './Migration';
import { Task } from '../models/Task';

const TODO_MIGRATIONS: Migrations = [
  (transaction) => {
    transaction.db.createObjectStore('tasks', {
      keyPath: 'id',
      autoIncrement: true,
    });
  },
];

export const todoDbStorage = new DbStorage<Task, Task['id']>(
  'TODO.DB',
  'tasks',
  TODO_MIGRATIONS,
);
