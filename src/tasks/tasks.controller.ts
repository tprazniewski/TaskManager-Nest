import { Param, Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ITask } from '../tasks/task.model';
import { CreateTaskDto } from '../tasks/dto/create-task-dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskservice: TasksService) {}

  @Get()
  getAllTasks(): ITask[] {
    return this.taskservice.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): ITask {
    return this.taskservice.getTaskById(id);
  }

  //UsingDTO
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): ITask {
    return this.taskservice.createTask(createTaskDto);
  }
  // First post approach
  //   @Post()
  //   createTask(@Body() body) {
  //     console.log('body', body);
  //   }

  // Second post approach

  //   @Post()
  //   createTask(
  //     @Body('title') title: string,
  //     @Body('description') description: string,
  //   ): ITask {
  //     return this.taskservice.createTask(title, description);
  //   }
}
