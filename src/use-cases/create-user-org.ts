import { hash } from 'bcrypt';
import { UserAlreadyExistsError } from './errors/user-already-exist-error';
import { User } from '@prisma/client';
import { UserRepository } from '../repositories/user-repository';

interface CreateUserCaseRequest {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  cep: string;
  uf: string;
  city: string;
  owner_name: string | null;
}

interface CreateUserCaseResponse {
  user: User;
}

export class CreateOrgUserCase {
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
    owner_name,
  }: CreateUserCaseRequest): Promise<CreateUserCaseResponse> {
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
      owner_name: owner_name,
    });

    return { user };
  }
}
