import { renderTasks } from "./renderTasks";
import { Task } from "./models/Task";
import { TaskModel } from "./models/TasksModel";
import { todoTasksStorage } from "./storage/todoTasksStorage";
import { TaskStatus } from "./models/TaskStatus";

const resultsElement = document.getElementById('results')!;
const todoForm = document.forms.namedItem('todo')!;
const tasksModel = new TaskModel(todoTasksStorage);

tasksModel.addEventListener('change', () => {
    renderTasks(resultsElement, tasksModel.tasks);
});

todoForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const text = String(new FormData(todoForm).get('date') ?? '');
    const dueDate = String(new FormData(todoForm).get('date') ?? '');

    tasksModel.createTask({
        text,
        dueDate: new Date(dueDate).toISOString(),
        createDate: new Date().toISOString(),
        status: TaskStatus.NEW,
    });
    todoForm.reset();
})

renderTasks(resultsElement, tasksModel.tasks);