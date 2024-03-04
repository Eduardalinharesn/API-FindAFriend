import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { GetUserUserCase } from '@/use-cases/get-user';
import { FastifyRequest, FastifyReply } from 'fastify';

export async function GetUser(request: FastifyRequest, reply: FastifyReply) {
  const userRepository = new PrismaUserRepository();
  const getUser = new GetUserUserCase(userRepository);

  //usado para adicionar sub ao request
  // await request.jwtVerify();

  const { user } = await getUser.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  });
}
