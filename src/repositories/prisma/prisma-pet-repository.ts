import { Prisma, $Enums, Pet, Requirement } from '@prisma/client';
import { PetsRepository } from '../pet-repository';
import { prisma } from '../../lib/prisma';

export class PrismaPetRepository implements PetsRepository {
  CreateInMemoryUser(
    data: Prisma.UserUncheckedCreateInput
  ): Promise<{
    id: string;
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
    cep: string;
    uf: string;
    city: string;
    owner_name: string | null;
    role: $Enums.Roles | null;
  }> {
    throw new Error('Method not implemented.');
  }
  async findByCity(city: string) {
    const pets = await prisma.pet.findMany({
      where: {
        org: {
          city: city,
        },
      },
    });

    return pets;
  }
  async findRequirement(id: string): Promise<Requirement[]> {
    const requirement = await prisma.pet.findUnique({
      where: {
        id,
      },
      select: {
        requirements: true,
      },
    });
    if (!requirement) {
      return [];
    }
    return requirement?.requirements;
  }

  async findMany(query: object): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: query,
    });

    return pets;
  }

  async findByOrg(org_id: string) {
    const pets = await prisma.pet.findMany({
      where: {
        org_id,
      },
    });
    return pets;
  }
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    });

    return pet;
  }
}
