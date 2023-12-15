import { BrowserLocalStorage } from './BrowserLocalStorage';
import { Task } from '../models/Task';

export const todoTasksStorage = new BrowserLocalStorage<Task, Task['id']>(
  'TODO.TASKS',
  () => crypto.randomUUID(),
);
