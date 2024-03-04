import { Requirement } from '@prisma/client';
import { RequirementRepository } from '../repositories/requirement-repository';
import { PetsRepository } from '../repositories/pet-repository';
import { ResourceNotFoundError as ResourceNotFoundError } from './errors/resorce-not-found.error';

interface CreateRequirementCaseRequest {
  pet_id: string;
  description: string;
}

interface CreateRequirementCaseResponse {
  requirement: Requirement;
}

export class CreateRequirementCase {
  constructor(
    private requirementRepository: RequirementRepository,
    private petRepository: PetsRepository
  ) {}
  async execute({
    pet_id,
    description,
  }: CreateRequirementCaseRequest): Promise<CreateRequirementCaseResponse> {
    const pet = await this.petRepository.findById(pet_id);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    const requirement = await this.requirementRepository.create({
      pet_id,
      description,
    });

    return { requirement };
  }
}
