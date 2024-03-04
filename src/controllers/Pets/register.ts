import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { PrismaPetRepository } from '../../repositories/prisma/prisma-pet-repository';
import { PrismaUserRepository } from '../../repositories/prisma/prisma-user-repository';
import { CreatePetCase } from '../../use-cases/register-pet';
import { UserAlreadyExistsError } from '../../use-cases/errors/user-already-exist-error';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    type: z.enum(['dog', 'cat']),
    age: z.enum(['puppy', 'adult', 'elder']),
    size: z.enum(['small', 'medium', 'big']),
    energy_level: z.number(),
    dependency_level: z.number(),
    description: z.string(),
    org_id: z.string(),
  });

  const {
    name,
    type,
    age,
    size,
    energy_level,
    dependency_level,
    description,
    org_id,
  } = registerBodySchema.parse(request.body);

  try {
    const petRepository = new PrismaPetRepository();
    const userRepository = new PrismaUserRepository();
    const registerPet = new CreatePetCase(petRepository, userRepository);

    const pet = await registerPet.execute({
      name,
      type,
      age,
      size,
      energy_level,
      dependency_level,
      description,
      org_id,
    });
    return reply.status(201).send(pet);
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }
}
