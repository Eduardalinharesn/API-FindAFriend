import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-user-repository';
import { AuthenticateUserCase } from './authenticate';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

let userRepository: InMemoryUserRepository;
let authenticateUseCase: AuthenticateUserCase;

describe('Authenticate Use Casw', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    authenticateUseCase = new AuthenticateUserCase(userRepository);
  });

  it('should be able to authenticate the user', async () => {
    await userRepository.create({
      name: 'Duda',
      address: 'Rua Piedade',
      cep: '0000000000',
      city: 'Tubarão',
      email: 'duda@email',
      password: await hash('123456', 6),
      phone: '000000000',
      uf: 'SC',
      owner_name: null,
    });

    const { user } = await authenticateUseCase.execute({
      email: 'duda@email',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  }),
    it('should not be able to authenticate with wrong email', async () => {
      await userRepository.create({
        name: 'Duda',
        address: 'Rua Piedade',
        cep: '0000000000',
        city: 'Tubarão',
        email: 'duda@email',
        password: await hash('123456', 6),
        phone: '000000000',
        uf: 'SC',
        owner_name: null,
      });

      await expect(() =>
        authenticateUseCase.execute({
          email: 'lala@email',
          password: '123456',
        })
      ).rejects.toBeInstanceOf(InvalidCredentialsError);
    }),
    it('should not be able to authenticate with wrong password', async () => {
      await userRepository.create({
        name: 'Duda',
        address: 'Rua Piedade',
        cep: '0000000000',
        city: 'Tubarão',
        email: 'duda@email',
        password: await hash('123456', 6),
        phone: '000000000',
        uf: 'SC',
        owner_name: null,
      });

      await expect(() =>
        authenticateUseCase.execute({
          email: 'duda@email',
          password: '123123',
        })
      ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
});
