import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { PrismaUserRepository } from '../../repositories/prisma/prisma-user-repository';
import { ResourceNotFoundError } from '../../use-cases/errors/resorce-not-found.error';
import { CreateTutorUserCase } from '@/use-cases/create-user-tutor';
import { Roles } from '@prisma/client';

export async function registerTutor(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    address: z.string(),
    phone: z.string(),
    cep: z.string(),
    uf: z.string(),
    city: z.string(),
  });

  const { name, email, password, address, phone, cep, uf, city } =
    registerBodySchema.parse(request.body);

  try {
    const userRepository = new PrismaUserRepository();
    const registerTutor = new CreateTutorUserCase(userRepository);

    await registerTutor.execute({
      name,
      email,
      password,
      address,
      phone,
      cep,
      uf,
      city,
      role: Roles.tutor,
    });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }
  return reply.status(201).send();
}
