import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository, DataSource } from 'typeorm';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials-dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = this.create({
      username,
      password,
    });
    await this.save(user);
  }
}
