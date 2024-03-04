import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryPetRepository } from '../repositories/in-memory/in-memory-pet-repository';
import { GetPetInfoUseCase } from './get-pet-info';
import { ResourceNotFoundError } from './errors/resorce-not-found.error';

let petRepository: InMemoryPetRepository;
let getPetInfoUseCase: GetPetInfoUseCase;

describe('Get Pet Info Use Case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository();
    getPetInfoUseCase = new GetPetInfoUseCase(petRepository);
  });

  it('should be the pet s info', async () => {
    const createdPet = await petRepository.create({
      name: 'lola',
      type: 'dog',
      age: 'puppy',
      size: 'medium',
      energy_level: 4,
      dependency_level: 3,
      description: 'cute and fun',
      org_id: 'gym-01',
    });

    const { pet } = await getPetInfoUseCase.execute({
      petId: createdPet.id,
    });

    expect(pet.name).toEqual('lola');
  });

  it('should not be able to get the pet s info with wrong id', async () => {
    expect(() =>
      getPetInfoUseCase.execute({
        petId: 'non-existing-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
