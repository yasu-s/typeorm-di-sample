import { Container } from 'inversify';
import { User } from './entities';
import { UserRepository } from './repositories';
import { sharedModule, repositoryModule, destroySharedModule } from './inversify.config';
import { TYPES } from './types';

const main = async (): Promise<void> => {
  const container = new Container();

  try {
    await container.loadAsync(sharedModule);
    container.load(repositoryModule);
    const userRepository = container.get<UserRepository>(TYPES.UserRepository);

    const user = new User();
    user.firstName = 'Timber';
    user.lastName = 'Saw';
    user.age = 25;
    await userRepository.save(user);

    const allUsers = await userRepository.findAll();
    console.log(JSON.stringify(allUsers));
  } catch (ex: unknown) {
    console.log(ex);
  } finally {
    await destroySharedModule(container);
    container.unbindAll();
  }
};

main();
