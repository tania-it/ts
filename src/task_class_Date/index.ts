import { getTasks, saveTasks } from "./storageUtils";
import { renderTasks } from "./renderTasks";
import { Task } from "./Task";

const resultsElement = document.getElementById('results')!;
const todoForm = document.forms.namedItem('todo')!;

const tasks = getTasks();

renderTasks(resultsElement, tasks);

todoForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(todoForm);
    const text = String(formData.get('taskText') ?? '');

    const task: Task = {
        //text,
        text: text,
        datetime: new Date().toISOString(),
    };

    tasks.push(task);
    saveTasks(tasks);
    renderTasks(resultsElement, tasks);
    todoForm.reset();
});
