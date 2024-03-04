import { Prisma } from '@prisma/client';
import { UserRepository } from '../user-repository';
import { prisma } from '../../lib/prisma';

export class PrismaUserRepository implements UserRepository {
  async findByCity(city: string, page: number) {
    const users = await prisma.user.findMany({
      where: {
        city: {
          contains: city,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });
    return users;
  }
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }
}
