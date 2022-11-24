import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

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
      autoLoadEntities: true, //find entities and loadmthem for us || Wee need to stick to the entities file naming convetion for this purpose
      synchronize: true, //always keep the db schema
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
