import { Connection } from 'typeorm';
import { User } from '../entities';
import { UserRepository } from './user-repository';

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly conn: Connection) {}

  public findAll(): Promise<User[]> {
    const repository = this.conn.getRepository(User);
    return repository.find();
  }

  public async save(user: Partial<User>): Promise<void> {
    const repository = this.conn.getRepository(User);
    await repository.save(user);
  }
}
