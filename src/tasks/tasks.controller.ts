import {
  Param,
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from '../tasks/task.status.enum';
import { CreateTaskDto } from '../tasks/dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { UpdateTaskStatusDto } from './dto/update-task-status-dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from 'src/auth/dto/get-user.decorator';
import { Logger } from '@nestjs/common';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('Tasks Controller');
  constructor(private taskservice: TasksService) {}

  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User ${user.username} retrieving all tasks. Filter ${JSON.stringify(
        filterDto,
      )}`,
      //filterDto is and object so we need to wrap it with JSON.stringify
    );
    return this.taskservice.getTasks(filterDto, user);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.taskservice.getTaskById(id, user);
  }
  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `User ${user} creating a new task. ${JSON.stringify(createTaskDto)}`,
    );
    return this.taskservice.createTask(createTaskDto, user);
  }

  @Delete(':id')
  deleteTaskById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.taskservice.deleteTask(id, user);
  }

  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskservice.updateTaskStatus(id, status, user);
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
