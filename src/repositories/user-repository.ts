import { User } from '../entities';

export interface UserRepository {
  findAll(): Promise<User[]>;
  save(user: Partial<User>): Promise<void>;
}
