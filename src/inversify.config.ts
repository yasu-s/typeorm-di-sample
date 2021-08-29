import { Connection } from 'typeorm';
import { AsyncContainerModule, ContainerModule, Container } from 'inversify';
import { ConnectionFactory } from './connection-factory';
import { TYPES } from './types';
import { UserRepositoryImpl, UserRepository } from './repositories';

export const sharedModule = new AsyncContainerModule(async (bind) => {
  const connection = await ConnectionFactory.create();
  bind<Connection>(TYPES.Connection).toConstantValue(connection);
});

export const destroySharedModule = async (container: Container): Promise<void> => {
  const connection = container.get<Connection>(TYPES.Connection);
  await connection.close();
  container.unload(sharedModule);
};

export const repositoryModule = new ContainerModule((bind) => {
  bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl);
});
