import { hash } from 'bcrypt';
import { UserAlreadyExistsError } from './errors/user-already-exist-error';
import { Pet, User } from '@prisma/client';
import { UserRepository } from '../repositories/user-repository';
import { PetsRepository } from '../repositories/pet-repository';
import { ResourceNotFoundError } from './errors/resorce-not-found.error';

interface CreatePetCaseRequest {
  name: string;
  type: 'dog' | 'cat';
  age: 'puppy' | 'adult' | 'elder';
  size: 'small' | 'medium' | 'big';
  energy_level: number;
  dependency_level: number;
  description: string;
  org_id: string;
}

interface CreatePetCaseResponse {
  pet: Pet;
}

export class CreatePetCase {
  constructor(
    private petRepository: PetsRepository,
    private userRepository: UserRepository
  ) {}
  async execute({
    name,
    type,
    age,
    size,
    energy_level,
    dependency_level,
    description,
    org_id,
  }: CreatePetCaseRequest): Promise<CreatePetCaseResponse> {
    const org = await this.userRepository.findById(org_id);

    if (!org) {
      throw new ResourceNotFoundError();
    }

    const pet = await this.petRepository.create({
      name,
      type,
      age,
      size,
      energy_level,
      dependency_level,
      description,
      org_id,
    });

    return { pet };
  }
}
