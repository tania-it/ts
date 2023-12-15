import { Task } from './models/Task';

export function renderTasks(root: HTMLElement, tasks: Task[], ): void {
  root.replaceChildren(tasks.reduce((fragment, task) => {
    fragment.append(createTaskItem(task));

    return fragment;
  }, document.createDocumentFragment()));
}

function createTaskItem({ createDate, text }: Task) {
  const li = document.createElement('li');
  const formattedDate = new Date(createDate).toLocaleString('ru');

  li.innerHTML = `<span>${formattedDate}</span> <span>${text}</span><button type="button">remove</button>`;

  return li;
}
