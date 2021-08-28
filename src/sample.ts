import { createConnection, Connection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { User } from './entity/user';

const main = async (): Promise<void> => {
  let connection: Connection | null = null;

  try {
    connection = await createConnection({
      type: 'sqlite',
      database: 'dist/database.sqlite',
      namingStrategy: new SnakeNamingStrategy(),
      entities: [User],
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
