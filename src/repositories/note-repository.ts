import { Note } from '../entities';

export interface NoteRepository {
  /**
   * 全件取得
   * @returns Note 配列
   */
  findAll(): Promise<Note[]>;

  /**
   * Note保存
   * @param note Note
   */
  save(note: Partial<Note>): Promise<void>;
}
