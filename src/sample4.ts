import { Container } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';
import { Note } from './entities';
import { NoteRepository } from './repositories';
import { sharedModule, destroySharedModule } from './inversify.config';
import { TYPES } from './types';

/**
 * inversify-binding-decorators検証用
 */
const main = async (): Promise<void> => {
  const container = new Container();

  try {
    await container.loadAsync(sharedModule);
    container.load(buildProviderModule());
    const noteRepository = container.get<NoteRepository>(TYPES.NoteRepository);

    const note = new Note();
    note.name = 'note name';
    note.note = 'note content';
    await noteRepository.save(note);

    const allNotes = await noteRepository.findAll();
    console.log(JSON.stringify(allNotes));
  } catch (ex: unknown) {
    console.log(ex);
  } finally {
    await destroySharedModule(container);
    container.unbindAll();
  }
};

main();
