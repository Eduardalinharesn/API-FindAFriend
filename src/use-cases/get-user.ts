import { UserRepository } from '@/repositories/user-repository';
import { User } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resorce-not-found.error';

interface GetUserUserCaseRequest {
  userId: string;
}

interface GetUserUserCaseResponse {
  user: User;
}

export class GetUserUserCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
  }: GetUserUserCaseRequest): Promise<GetUserUserCaseResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return { user };
  }
}
