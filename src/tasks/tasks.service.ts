import { Injectable } from '@nestjs/common';
import { ITask, TaskStatus } from '..//tasks/task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
//if We use Injectable decorator , it makes is a singleton and  We can use it across the whole app
@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  getTaskById(id: string): ITask {
    return this.tasks.find((task) => task.id === id);
  }

  getAllTasks(): ITask[] {
    return this.tasks;
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    console.log(this.tasks);
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): ITask {
    const { title, description } = createTaskDto;
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
