import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-user-repository';
import { beforeEach, describe, expect, it } from 'vitest';

import { CreateTutorUserCase } from './create-user-tutor';
import { Roles } from '@prisma/client';

let userRepository: InMemoryUserRepository;
let createTutoUseCase: CreateTutorUserCase;

describe('Create User Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    createTutoUseCase = new CreateTutorUserCase(userRepository);
  });

  it('should be able to create a new user tutor', async () => {
    const { user } = await createTutoUseCase.execute({
      name: 'Duda',
      address: 'Rua Piedade',
      cep: '0000000000',
      city: 'Tubarão',
      email: 'duda@email',
      password: '123456',
      phone: '000000000',
      uf: 'SC',
      role: Roles.tutor,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.role).toEqual(Roles.tutor);
  });
});
