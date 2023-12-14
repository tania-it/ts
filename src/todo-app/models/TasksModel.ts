import { AbstractStorage } from "../storage/AbstractStorage";
import { Task } from './Task';

export class TaskModel extends EventTarget {
    readonly #storage: AbstractStorage<Task, Task['id']>;
    #tasks: Task[] = [];

    readonly events = new EventTarget();

    constructor(storage: AbstractStorage<Task, Task['id']>) {
        super();
        this.#storage = storage;
        this.#storage.getAll().then((tasks) => {
            this.#tasks = tasks;
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

    #dispatchChange(updatedTasks: Task[]): void {
        this.#tasks = updatedTasks;
        this.dispatchEvent(new CustomEvent('change')); // самодельное событие создаем
    }

}