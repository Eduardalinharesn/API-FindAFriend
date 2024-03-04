import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaPetRepository } from '../../repositories/prisma/prisma-pet-repository';
import { FilterPetsUseCase } from '@/use-cases/filter-pets';
import { ResourceNotFoundError } from '@/use-cases/errors/resorce-not-found.error';

export async function FilterPets(request: FastifyRequest, reply: FastifyReply) {
  const { query } = request;

  const requestQuery = JSON.parse(JSON.stringify(query));

  try {
    const petRepository = new PrismaPetRepository();
    const filterPets = new FilterPetsUseCase(petRepository);

    const pets = await filterPets.execute({ query: requestQuery });

    return reply.status(200).send(pets);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }
}
