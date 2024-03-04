import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryPetRepository } from '../repositories/in-memory/in-memory-pet-repository';
import { FilterPetsUseCase } from './filter-pets';

let petRepository: InMemoryPetRepository;
let filterPetsUseCase: FilterPetsUseCase;

describe('List Pet Use Case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository();
    filterPetsUseCase = new FilterPetsUseCase(petRepository);
  });

  it('should be able to filter a pet by a characteristic', async () => {
    const petCreated = await petRepository.create({
      name: 'lola',
      type: 'dog',
      age: 'puppy',
      size: 'medium',
      energy_level: 4,
      dependency_level: 3,
      description: 'cute and fun',
      org_id: 'org_id',
    });

    const petCreated2 = await petRepository.create({
      name: 'lola',
      type: 'cat',
      age: 'puppy',
      size: 'medium',
      energy_level: 4,
      dependency_level: 3,
      description: 'cute and fun',
      org_id: 'org_id',
    });

    const pets = await filterPetsUseCase.execute({
      query: {
        type: 'dog',
      },
    });

    expect(pets.pets).toHaveLength(1);
    expect(pets.pets).toEqual([
      expect.objectContaining({
        name: 'lola',
        type: 'dog',
      }),
    ]);
  });
});
