import { Pet } from '@prisma/client';
import { PetsRepository } from '../repositories/pet-repository';

interface FilterPetsUseCaseRequest {
  query: object;
}

interface FilterPetsUserCaseResponse {
  pets: Pet[] | [];
}

export class FilterPetsUseCase {
  constructor(private petRepository: PetsRepository) {}

  async execute({
    query,
  }: FilterPetsUseCaseRequest): Promise<FilterPetsUserCaseResponse> {
    const findMany = await this.petRepository.findMany(query);

    if (findMany) {
      return { pets: findMany };
    }
    return { pets: [] };
  }
}
