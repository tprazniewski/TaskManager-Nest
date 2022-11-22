import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ITask } from '../tasks/task.model';
@Controller('tasks')
export class TasksController {
  constructor(private taskservice: TasksService) {}

  @Get()
  getAllTasks(): ITask[] {
    return this.taskservice.getAllTasks();
  }
}
