import { Connection } from 'typeorm';
import { injectable, inject } from 'inversify';
import { User } from '../entities';
import { TYPES } from '../types';
import { UserRepository } from './user-repository';

@injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(@inject(TYPES.Connection) private readonly conn: Connection) {}

  public findAll(): Promise<User[]> {
    const repository = this.conn.getRepository(User);
    return repository.find();
  }

  public async save(user: Partial<User>): Promise<void> {
    const repository = this.conn.getRepository(User);
    await repository.save(user);
  }
}
