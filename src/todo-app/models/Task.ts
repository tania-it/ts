import { TaskStatus } from './TaskStatus';
import { WithId } from './WithId';

export interface Task extends WithId {
  text: string;
  createDate: string;
  dueDate: string;
  status: TaskStatus;
}
