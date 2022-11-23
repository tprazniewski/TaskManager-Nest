import { Injectable, NotFoundException } from '@nestjs/common';
import { ITask, TaskStatus } from '..//tasks/task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
//if We use Injectable decorator , it makes is a singleton and  We can use it across the whole app
@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  getTaskById(id: string): ITask {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      // throw new NotFoundException();
      throw new NotFoundException(`task with id: ${id} not found`);
    }
    return found;
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

  getTasksWithFilters(filterDto: GetTasksFilterDto): ITask[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return tasks;
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
