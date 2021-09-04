import { Connection } from 'typeorm';
import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { Note } from '../entities';
import { TYPES } from '../types';
import { NoteRepository } from './note-repository';

@provide(TYPES.NoteRepository)
export class NoteRepositoryImpl implements NoteRepository {
  constructor(@inject(TYPES.Connection) private readonly conn: Connection) {}

  public findAll(): Promise<Note[]> {
    const repository = this.conn.getRepository(Note);
    return repository.find();
  }

  public async save(note: Partial<Note>): Promise<void> {
    const repository = this.conn.getRepository(Note);
    await repository.save(note);
  }
}
