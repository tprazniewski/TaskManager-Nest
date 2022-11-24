import {
  Param,
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from '../tasks/task.status.enum';
import { CreateTaskDto } from '../tasks/dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { UpdateTaskStatusDto } from './dto/update-task-status-dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private taskservice: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskservice.getTasks(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskservice.getTaskById(id);
  }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskservice.createTask(createTaskDto);
  }

  @Delete(':id')
  deleteTaskById(@Param('id') id: string): Promise<void> {
    return this.taskservice.deleteTask(id);
  }

  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Promise<Task> {
    return this.taskservice.updateTaskStatus(id, status);
  }

  // @Get()
  // getTasks(@Query() filterDto: GetTasksFilterDto): ITask[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.taskservice.getTasksWithFilters(filterDto);
  //   } else {
  //     return this.taskservice.getAllTasks();
  //   }
  // }

  // @Get('/:id')
  // getTaskById(@Param('id') id: string): ITask {
  //   return this.taskservice.getTaskById(id);
  // }

  // @Delete(':id')
  // deleteTaskById(@Param('id') id: string): void {
  //   return this.taskservice.deleteTaskById(id);
  // }

  // // @Patch(':id/status')
  // // updateTaskStatus(
  // //   @Param('id') id: string,
  // //   @Body('status') status: TaskStatus,
  // // ): ITask {
  // //   return this.taskservice.updateTaskStatus(id, status);
  // // }

  // //using DTO
  // @Patch(':id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  // ): ITask {
  //   const { status } = updateTaskStatusDto;
  //   return this.taskservice.updateTaskStatus(id, status);
  // }
  // //UsingDTO
  // @Post()
  // createTask(@Body() createTaskDto: CreateTaskDto): ITask {
  //   return this.taskservice.createTask(createTaskDto);
  // }
  // // First post approach
  // //   @Post()
  // //   createTask(@Body() body) {
  // //   }

  // // Second post approach

  // //   @Post()
  // //   createTask(
  // //     @Body('title') title: string,
  // //     @Body('description') description: string,
  // //   ): ITask {
  // //     return this.taskservice.createTask(title, description);
  // //   }
}
