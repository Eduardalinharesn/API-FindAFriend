import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryPetRepository } from '../repositories/in-memory/in-memory-pet-repository';
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-user-repository';
import { CreatePetCase } from './register-pet';
import { randomUUID } from 'crypto';
import { ResourceNotFoundError } from './errors/resorce-not-found.error';

let petRepository: InMemoryPetRepository;
let userRepository: InMemoryUserRepository;
let registerPetUseCase: CreatePetCase;

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository();
    userRepository = new InMemoryUserRepository();
    registerPetUseCase = new CreatePetCase(petRepository, userRepository);
  });

  it('should be able to register a pet', async () => {
    const user = await userRepository.create({
      name: 'Patinhas Unidas',
      address: 'Rua Piedade',
      cep: '0000000000',
      city: 'Tubarão',
      email: 'patinhas@email',
      password: '123456',
      phone: '000000000',
      uf: 'SC',
      owner_name: 'Fabio',
    });

    const pet = await registerPetUseCase.execute({
      name: 'lola',
      type: 'dog',
      age: 'puppy',
      size: 'medium',
      energy_level: 4,
      dependency_level: 3,
      description: 'cute and fun',
      org_id: user.id,
    });

    expect(pet.pet.id).toEqual(expect.any(String));
  });

  it('should not be able to register a pet', async () => {
    const user = await userRepository.create({
      name: 'Patinhas Unidas',
      address: 'Rua Piedade',
      cep: '0000000000',
      city: 'Tubarão',
      email: 'patinhas@email',
      password: '123456',
      phone: '000000000',
      uf: 'SC',
      owner_name: 'Fabio',
    });

    await expect(() =>
      registerPetUseCase.execute({
        name: 'lola',
        type: 'dog',
        age: 'puppy',
        size: 'medium',
        energy_level: 4,
        dependency_level: 3,
        description: 'cute and fun',
        org_id: randomUUID(),
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
