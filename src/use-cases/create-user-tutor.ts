import { hash } from 'bcrypt';
import { UserAlreadyExistsError } from './errors/user-already-exist-error';
import { Roles, User } from '@prisma/client';
import { UserRepository } from '../repositories/user-repository';

interface CreateTutorUserCaseRequest {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  cep: string;
  uf: string;
  city: string;
  role: string;
}

interface CreateTutorUserCaseResponse {
  user: User;
}

export class CreateTutorUserCase {
  constructor(private usersRepository: UserRepository) {}
  async execute({
    name,
    email,
    password,
    address,
    phone,
    cep,
    uf,
    city,
    role,
  }: CreateTutorUserCaseRequest): Promise<CreateTutorUserCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password: password_hash,
      address,
      phone,
      cep,
      uf,
      city,
      role: Roles.tutor,
    });

    return { user };
  }
}
