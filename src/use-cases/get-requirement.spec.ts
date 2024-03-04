import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryPetRepository } from '../repositories/in-memory/in-memory-pet-repository';
import { InMemoryRequirementRepository } from '@/repositories/in-memory/in-memory-requirement-repository';
import { GetPetRequirementsUseCase } from './get-requirement';

let petRepository: InMemoryPetRepository;
let requirementRepository: InMemoryRequirementRepository;
let GetRequirementUseCase: GetPetRequirementsUseCase;

describe('Get Pet Info Use Case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository();
    requirementRepository = new InMemoryRequirementRepository();
    GetRequirementUseCase = new GetPetRequirementsUseCase(
      requirementRepository,
      petRepository
    );
  });

  it('should be the get requirement', async () => {
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

    const requirementCreated = await requirementRepository.create({
      pet_id: createdPet.id,
      description: 'Cant be an apartment',
    });

    const { requirement } = await GetRequirementUseCase.execute({
      petId: createdPet.id,
    });

    // não acessa requirement de createPet
    // expect(createdPet.requirement).toHaveLength(1);
  });
});
