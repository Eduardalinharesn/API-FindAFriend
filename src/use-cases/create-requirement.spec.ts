import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryPetRepository } from '../repositories/in-memory/in-memory-pet-repository';
import { InMemoryRequirementRepository } from '../repositories/in-memory/in-memory-requirement-repository';
import { CreateRequirementCase } from './create-requirement';
import { randomUUID } from 'crypto';
import { ResourceNotFoundError } from './errors/resorce-not-found.error';

let requirementRepository: InMemoryRequirementRepository;
let petRepository: InMemoryPetRepository;
let CreateRequirementeUseCase: CreateRequirementCase;

describe('Create Requirement Use Case', () => {
  beforeEach(async () => {});

  it('should be able to create requirement', async () => {
    requirementRepository = new InMemoryRequirementRepository();
    petRepository = new InMemoryPetRepository();
    CreateRequirementeUseCase = new CreateRequirementCase(
      requirementRepository,
      petRepository
    );

    const pet = await petRepository.create({
      name: 'lola',
      type: 'dog',
      age: 'puppy',
      size: 'medium',
      energy_level: 4,
      dependency_level: 3,
      description: 'cute and fun',
      org_id: 'gym-01',
    });

    const { requirement } = await CreateRequirementeUseCase.execute({
      pet_id: pet.id,
      description: 'Needs big spaces',
    });

    expect(requirement.id).toEqual(expect.any(String));
  });

  it('should not be able to create requirement', async () => {
    let requirementRepository = new InMemoryRequirementRepository();
    let petRepository = new InMemoryPetRepository();
    let usecase = new CreateRequirementCase(
      requirementRepository,
      petRepository
    );

    const pet = await petRepository.create({
      name: 'lola',
      type: 'dog',
      age: 'puppy',
      size: 'medium',
      energy_level: 4,
      dependency_level: 3,
      description: 'cute and fun',
      org_id: 'gym-01',
    });

    await expect(() =>
      usecase.execute({
        pet_id: randomUUID(),
        description: 'Needs big spaces',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
