import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5439,
      username: 'postgres',
      password: 'postgres',
      database: 'task-management',
      autoLoadEntities: true, //find entities and loadmthem for us
      synchronize: true, //always keep the db schema
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
