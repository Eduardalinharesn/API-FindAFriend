import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-user-repository';
import { beforeEach, describe, expect, it } from 'vitest';

import { Roles } from '@prisma/client';
import { CreateOrgUserCase } from './create-user-org';

let userRepository: InMemoryUserRepository;
let CreateOrgUseCase: CreateOrgUserCase;

describe('Create User Case Org', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    CreateOrgUseCase = new CreateOrgUserCase(userRepository);
  });

  it('should be able to create a new user tutor', async () => {
    const { user } = await CreateOrgUseCase.execute({
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

    expect(user.id).toEqual(expect.any(String));
    expect(user.role).toEqual(Roles.organization);
  });
});
