import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exist-error';
import { ListPetsByCityUseCase } from '@/use-cases/list-pets-by-city';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function ListPetsByCity(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const registerBodySchema = z.object({
      city: z.string(),
    });
    const { city } = registerBodySchema.parse(request.params);
    const petRepository = new PrismaPetRepository();
    const listPetByCity = new ListPetsByCityUseCase(petRepository);

    const { pets } = await listPetByCity.execute({
      city: city,
    });

    return reply.status(200).send({
      pets,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }
}
