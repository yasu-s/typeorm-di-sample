import { Connection } from 'typeorm';
import { User } from './entities';
import { UserRepositoryImpl } from './repositories';
import { ConnectionFactory } from './connection-factory';

const main = async (): Promise<void> => {
  let connection: Connection | null = null;

  try {
    connection = await ConnectionFactory.create();
    const userRepository = new UserRepositoryImpl(connection);

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
    if (connection) {
      await connection.close();
    }
  }
};

main();
