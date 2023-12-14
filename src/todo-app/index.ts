import { renderTasks } from "./renderTasks";
import { Task } from "./models/Task";
import { TaskModel } from "./models/TasksModel";
import { todoTasksStorage } from "./storage/todoTasksStorage";
import { TaskStatus } from "./models/TaskStatus";
import { DbStorage } from "./storage/DbStorage";

const resultsElement = document.getElementById('results')!;
const todoForm = document.forms.namedItem('todo')!;
const tasksModel = new TaskModel(todoTasksStorage);

tasksModel.addEventListener('change', () => {
    renderTasks(resultsElement, tasksModel.tasks);
});

todoForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const text = String(new FormData(todoForm).get('taskText') ?? '');
    const dueDate = String(new FormData(todoForm).get('date') ?? '');

    tasksModel.createTask({
        text,
        dueDate: new Date(dueDate).toISOString(),
        createDate: new Date().toISOString(),
        status: TaskStatus.NEW,
    });
    todoForm.reset();
})

// renderTasks(resultsElement, tasksModel.tasks);

const todoDbStorage = new DbStorage<Task, Task['id']>(
    'TODO.DB',
    'tasks',
    [  // создаём массив миграций 
        (transaction) => {
            transaction.db.createObjectStore('tasks', {keyPath: 'id', autoIncrement: true});
        },
        (transaction) => {
           const request = transaction.objectStore('tasks').openCursor('id');

           request.onsuccess = (event) => {

           };
        },
        (transaction) => {
            transaction.objectStore('tasks').createIndex('priority', 'priority', {
                unique: false,
            });
        },
    ],
);

todoDbStorage.get(1);
