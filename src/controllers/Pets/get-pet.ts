import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exist-error';
import { GetPetInfoUseCase } from '@/use-cases/get-pet-info';
import { extractQueryParams } from '@/utils/extract-query-param';
import { FastifyReply, FastifyRequest } from 'fastify';
import { stringify } from 'querystring';
import { z } from 'zod';

export async function GetPet(request: FastifyRequest, reply: FastifyReply) {
  try {
    const petRepository = new PrismaPetRepository();
    const getPet = new GetPetInfoUseCase(petRepository);

    const registerBodySchema = z.object({
      id: z.string(),
    });

    const { id } = registerBodySchema.parse(request.params);
    const { pet } = await getPet.execute({
      petId: id,
    });

    return reply.status(200).send({
      pet,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }
}
