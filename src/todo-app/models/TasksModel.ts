import { AbstractStorage } from '../storage/AbstractStorage';
import { Task } from './Task';
import { TaskStatus } from './TaskStatus';

export class TasksModel extends EventTarget {
  readonly #storage: AbstractStorage<Task, Task['id']>;
  #tasks: Task[] = [];

  constructor(storage: AbstractStorage<Task, Task['id'], any, any>) {
    super();
    this.#storage = storage;
    this.#storage.getAll().then((tasks) => {
      this.#dispatchChange(tasks);
    });
  }

  get tasks(): Task[] {
    return this.#tasks;
  }

  createTask(newTask: Omit<Task, 'id'>): void {
    this.#storage.write(newTask).then((id) => {
      this.#dispatchChange(this.#tasks.concat({
        ...newTask,
        id,
      }));
    });
  }

  async markTaskAsCompleted(id: Task['id']): Promise<void> {
    const data = await this.#storage.get(id);

    if (data) {
      data.status = TaskStatus.COMPLETED;
      await this.#storage.write(data);
      this.#dispatchChange(this.#tasks.map((task) => {
        return task.id !== data.id ? task : data;
      }));
    }
  }

  #dispatchChange(updatedTasks: Task[]): void {
    this.#tasks = updatedTasks;
    this.dispatchEvent(new CustomEvent('change'));
  }
}
