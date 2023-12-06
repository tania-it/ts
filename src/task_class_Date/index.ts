
const resultsElement = document.getElementById('results')!;
const todoForm = document.forms.namedItem('todo')!;

const tasks = getTasks();

renderTasks(resultsElement, tasks);

todoForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const text = String(new FormData(todoForm).get('taskText') ?? '');

    const task: Task = {
        text,
        datetime: new Date().toISOString(),
    }


    tasks.push(task);
    saveTasks(tasks);
    renderTasks(resultsElement, tasks);
    todoForm.reset();
});
