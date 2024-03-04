import { Pet, Prisma, Requirement, User } from '@prisma/client';

export interface RequirementRepository {
  create(data: Prisma.RequirementUncheckedCreateInput): Promise<Requirement>;
  findById(id: string): Promise<Requirement | null>;
  findByPetId(pet_id: string): Promise<Requirement[] | null | undefined>;
}
