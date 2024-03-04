import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryPetRepository } from '../repositories/in-memory/in-memory-pet-repository';
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-user-repository';
import { CreatePetCase } from './register-pet';
import { randomUUID } from 'crypto';
import { ResourceNotFoundError } from './errors/resorce-not-found.error';
import { ListPetsByCityUseCase } from './list-pets-by-city';

let petRepository: InMemoryPetRepository;
let listPetByCityUseCase: ListPetsByCityUseCase;

describe('List Pet Use Case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository();
    listPetByCityUseCase = new ListPetsByCityUseCase(petRepository);
  });

  it('should be able to list a pet by city', async () => {
    const user = await petRepository.CreateInMemoryUser({
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

    const petCreated = await petRepository.create({
      name: 'lola',
      type: 'dog',
      age: 'puppy',
      size: 'medium',
      energy_level: 4,
      dependency_level: 3,
      description: 'cute and fun',
      org_id: user.id,
    });

    const petCreated2 = await petRepository.create({
      name: 'pita',
      type: 'dog',
      age: 'puppy',
      size: 'medium',
      energy_level: 4,
      dependency_level: 3,
      description: 'cute and fun',
      org_id: user.id,
    });

    const petCreated3 = await petRepository.create({
      name: 'tita',
      type: 'dog',
      age: 'puppy',
      size: 'medium',
      energy_level: 4,
      dependency_level: 3,
      description: 'cute and fun',
      org_id: randomUUID(),
    });

    const pets = await listPetByCityUseCase.execute({
      city: 'Tubarão',
    });

    expect(pets.pets).toHaveLength(2);
  });
});
