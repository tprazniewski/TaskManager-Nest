import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../tasks/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
  // eager  means => automatically fetch the tasks
  @OneToMany((_type) => Task, (task) => task.user, { eager: true }) // We use _ before task if we dont use it||firt argument, We specify the type of this entity which is Task. Second argument how to we access User from the other side of the relation
  tasks: Task[];
}
