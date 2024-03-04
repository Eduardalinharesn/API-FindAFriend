import { Pet, Prisma, Requirement, User } from '@prisma/client';
import { S } from 'vitest/dist/reporters-QGe8gs4b';

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findById(id: string): Promise<Pet | null>;
  findByOrg(org_id: string): Promise<Pet[]>;
  findByCity(city: string): Promise<Pet[] | null>;
  findMany(query: object): Promise<Pet[] | null>;
  findRequirement(pet_id: string): Promise<Requirement[] | null>;

  CreateInMemoryUser(data: Prisma.UserUncheckedCreateInput): Promise<User>;
}
