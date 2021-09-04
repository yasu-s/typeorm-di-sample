import { Note } from '../entities';

export interface NoteRepository {
  findAll(): Promise<Note[]>;
  save(note: Partial<Note>): Promise<void>;
}
