import { createConnection, Connection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as entity from './entities';

export class ConnectionFactory {
  public static create(): Promise<Connection> {
    const entities = Object.values(entity);
    return createConnection({
      type: 'sqlite',
      database: 'dist/database.sqlite',
      namingStrategy: new SnakeNamingStrategy(),
      entities: entities,
      synchronize: true,
    });
  }
}
