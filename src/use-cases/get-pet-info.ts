import { Pet } from '@prisma/client';
import { PetsRepository } from '../repositories/pet-repository';
import { ResourceNotFoundError } from './errors/resorce-not-found.error';

interface GetPetInfoUseCaseRequest {
  petId: string;
}

interface GetPetInfoUserCaseResponse {
  pet: Pet;
}

export class GetPetInfoUseCase {
  constructor(private petRepository: PetsRepository) {}

  async execute({
    petId,
  }: GetPetInfoUseCaseRequest): Promise<GetPetInfoUserCaseResponse> {
    const pet = await this.petRepository.findById(petId);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    return { pet };
  }
}
