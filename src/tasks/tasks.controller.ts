import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ITask } from '../tasks/task.model';
@Controller('tasks')
export class TasksController {
  constructor(private taskservice: TasksService) {}

  @Get()
  getAllTasks(): ITask[] {
    return this.taskservice.getAllTasks();
  }
  // First post approach
  //   @Post()
  //   createTask(@Body() body) {
  //     console.log('body', body);
  //   }

  // Second post approach

  @Post()
  createTask(@Body('title') title, @Body('description') description) {
    console.log('title', title);
    console.log('description', description);
  }
}
