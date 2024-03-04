import { Pet, Requirement } from '@prisma/client';
import { PetsRepository } from '../repositories/pet-repository';
import { ResourceNotFoundError } from './errors/resorce-not-found.error';
import { RequirementRepository } from '@/repositories/requirement-repository';

interface GetPetRequirementsUseCaseRequest {
  petId: string;
}

interface GetPetRequirementsUserCaseResponse {
  requirement: Requirement[];
}

export class GetPetRequirementsUseCase {
  constructor(
    private requirementRepository: RequirementRepository,
    private petRepository: PetsRepository
  ) {}

  async execute({
    petId,
  }: GetPetRequirementsUseCaseRequest): Promise<GetPetRequirementsUserCaseResponse> {
    const pet = await this.petRepository.findById(petId);
    if (!pet) {
      throw new ResourceNotFoundError();
    }

    const requirement = await this.requirementRepository.findByPetId(petId);

    if (!requirement) {
      throw new ResourceNotFoundError();
    }
    return { requirement };
  }
}
