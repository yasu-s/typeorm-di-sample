import { createConnection, Connection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as entity from './entities';
import { User } from './entities';

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

    const repository = connection.getRepository(User);

    const user = new User();
    user.firstName = 'Timber';
    user.lastName = 'Saw';
    user.age = 25;
    await repository.save(user);

    const allUsers = await repository.find();
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
