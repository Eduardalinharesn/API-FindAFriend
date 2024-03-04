import { $Enums, Prisma, Requirement, User } from '@prisma/client';
import { UserRepository } from '../user-repository';
import { randomUUID } from 'crypto';
import { RequirementRepository } from '../requirement-repository';

export class InMemoryRequirementRepository implements RequirementRepository {
  findByPetId(pet_id: string): Promise<
    | {
        id: string;
        pet_id: string;
        description: string;
        create_at: Date;
        update_at: Date | null;
      }[]
    | null
  > {
    throw new Error('Method not implemented.');
  }
  public items: Requirement[] = [];

  async create(data: Prisma.RequirementUncheckedCreateInput) {
    const Requirement = {
      id: randomUUID(),
      pet_id: randomUUID(),
      description: data.description,
      create_at: new Date(),
      update_at: null,
    };

    this.items.push(Requirement);
    return Requirement;
  }

  async findById(id: string) {
    const requirement = this.items.find((item) => item.id === id);

    if (!requirement) {
      return null;
    }

    return requirement;
  }
}
