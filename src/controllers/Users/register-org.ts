import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { PrismaUserRepository } from '../../repositories/prisma/prisma-user-repository';
import { CreateOrgUserCase } from '../../use-cases/create-user-org';
import { ResourceNotFoundError } from '../../use-cases/errors/resorce-not-found.error';

export async function registerOrg(
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
    owner_name: z.string(),
  });

  const { name, email, password, address, phone, cep, uf, city, owner_name } =
    registerBodySchema.parse(request.body);

  try {
    const userRepository = new PrismaUserRepository();
    const registerOrg = new CreateOrgUserCase(userRepository);

    await registerOrg.execute({
      name,
      email,
      password,
      address,
      phone,
      cep,
      uf,
      city,
      owner_name,
    });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }
  return reply.status(201).send();
}
