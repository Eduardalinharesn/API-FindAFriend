import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { AuthenticateUserCase } from '@/use-cases/authenticate';
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const userRepository = new PrismaUserRepository();
    const authenticate = new AuthenticateUserCase(userRepository);

    const { user } = await authenticate.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      { role: user.role },
      {
        sign: {
          sub: user.id,
        },
      }
    );

    return reply.status(200).send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }
    throw error;
  }
}
