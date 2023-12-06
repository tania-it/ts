import { Task } from './Task'

export function renderTasks(root: HTMLElement, tasks: Task[]): void {
    root.replaceChildren(tasks.reduce((fragment, task)) => {
        fragment.append(createTaskItem(task));

        return fragment;
    }, document.createDocumentFragment()));
}

function createTaskItem({ datetime, text }: Task) {
    const li = document.createElement('li');
    const formattedDate = new Date(datetime).toLocaleString('ru');

    li.innerHTML = `<span>${formattedDate}</span> <span>${text}</span>`;

    return li;
}
