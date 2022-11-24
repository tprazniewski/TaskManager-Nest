import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])], // allow us DI whereever we need in the taskModule
  controllers: [TasksController],
  providers: [TasksService, TaskRepository],
})
export class TasksModule {}
