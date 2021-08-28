import { createConnection, Connection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as entity from './entities';
import { User } from './entities';
import { UserRepositoryImpl } from './repositories';

const main = async (): Promise<void> => {
  let connection: Connection | null = null;

  try {
    const entities = Object.values(entity);
    connection = await createConnection({
      type: 'sqlite',
      database: 'dist/database.sqlite',
      namingStrategy: new SnakeNamingStrategy(),
      entities: entities,
      synchronize: true,
    });

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
