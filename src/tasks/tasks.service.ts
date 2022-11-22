import { Injectable } from '@nestjs/common';
import { ITask } from '..//tasks/task.model';
//if We use Injectable decorator , it makes is a singleton and  We can use it across the whole app
@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  getAllTasks(): ITask[] {
    return this.tasks;
  }
}
