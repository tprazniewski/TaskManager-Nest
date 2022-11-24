import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from '../tasks/task.model';
@Entity()
export class Task {
  // @PrimaryGeneratedColumn('uuid')
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
