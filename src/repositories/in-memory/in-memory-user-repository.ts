import { Prisma, Roles, User } from '@prisma/client';
import { UserRepository } from '../user-repository';
import { randomUUID } from 'crypto';

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = [];

  async findByCity(city: string, page: number) {
    return this.users
      .filter((item) => item.city.includes(city))
      .slice((page - 1) * 20, page * 20);
  }

  async findByEmail(email: string) {
    const user = this.users.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      address: data.address,
      phone: data.phone,
      cep: data.cep,
      uf: data.uf,
      city: data.city,
      role: data.role ? data.role : Roles.organization,
      owner_name: data.owner_name ? data.owner_name : null,
    };

    this.users.push(user);
    return user;
  }
  async findById(id: string) {
    const user = this.users.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }
}
