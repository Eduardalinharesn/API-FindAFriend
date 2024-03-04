import { expect, test, describe, it, beforeEach } from 'vitest';
import { GetUserUserCase } from './get-user';
import { ResourceNotFoundError } from './errors/resorce-not-found.error';
import { InMemoryUserRepository } from 'src/repositories/in-memory/in-memory-user-repository';

let userRepository: InMemoryUserRepository;
let getUserUseCase: GetUserUserCase;

describe('Get User Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    getUserUseCase = new GetUserUserCase(userRepository);
  });

  it('should be able get a orgs info', async () => {
    const createdUser = await userRepository.create({
      name: 'Patinha Unidas',
      address: 'Rua Piedade',
      cep: '0000000000',
      city: 'Tubarão',
      email: 'patinhas@email',
      password: '123456',
      phone: '000000000',
      uf: 'SC',
      owner_name: 'Fabio',
    });

    const { user } = await getUserUseCase.execute({
      userId: createdUser.id,
    });

    expect(user.name).toEqual('Patinha Unidas');
  });

  it('should not be able to get users info with wrong id', async () => {
    expect(() =>
      getUserUseCase.execute({
        userId: 'non-existing-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it('should be able to get a tutors info', async () => {
    const createdUser = await userRepository.create({
      name: 'Paulo',
      address: 'Rua Piedade',
      cep: '0000000000',
      city: 'Tubarão',
      email: 'patinhas@email',
      password: '123456',
      phone: '000000000',
      uf: 'SC',
    });

    const { user } = await getUserUseCase.execute({
      userId: createdUser.id,
    });

    expect(user.name).toEqual('Paulo');
  });
});
