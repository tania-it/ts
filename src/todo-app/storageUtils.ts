import { Task } from './models/Task';

const STORAGE_TASKS_KEY = 'CW.TODO_TASKS';

export function saveTasks(tasks: Task[]) {
  localStorage.setItem(STORAGE_TASKS_KEY, JSON.stringify(tasks));
}

export function getTasks(): Task[] {
  const storageData = localStorage.getItem(STORAGE_TASKS_KEY);

  return storageData ? JSON.parse(storageData) : [];
}
