import { Prisma } from '@prisma/client';
import { RequirementRepository } from '../requirement-repository';
import { prisma } from '../../lib/prisma';

export class PrismaRequirementRepository implements RequirementRepository {
  async findByPetId(pet_id: string) {
    const requirements = await prisma.requirement.findMany({
      where: {
        pet: {
          id: pet_id,
        },
      },
    });
    return requirements;
  }
  async create(data: Prisma.RequirementUncheckedCreateInput) {
    const requirement = await prisma.requirement.create({
      data,
    });

    return requirement;
  }
  async findById(id: string) {
    const requirement = await prisma.requirement.findUnique({
      where: {
        id,
      },
    });

    return requirement;
  }
}
