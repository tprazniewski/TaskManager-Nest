import { Injectable } from '@nestjs/common';
import { ITask, TaskStatus } from '..//tasks/task.model';
import { v4 as uuid } from 'uuid';
//if We use Injectable decorator , it makes is a singleton and  We can use it across the whole app
@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  getAllTasks(): ITask[] {
    return this.tasks;
  }

  createTask(title: string, description: string): ITask {
    const task: ITask = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
}
