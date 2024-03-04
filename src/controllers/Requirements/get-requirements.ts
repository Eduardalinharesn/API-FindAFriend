import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { PrismaPetRepository } from '../../repositories/prisma/prisma-pet-repository';
import { ResourceNotFoundError } from '../../use-cases/errors/resorce-not-found.error';
import { PrismaRequirementRepository } from '@/repositories/prisma/prisma-requirement';
import { CreateRequirementCase } from '@/use-cases/create-requirement';
import { GetPetRequirementsUseCase } from '@/use-cases/get-requirement';

export async function GetRequirement(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const registerBodySchema = z.object({
      id: z.string(),
    });

    const { id } = registerBodySchema.parse(request.params);

    const requirementRepository = new PrismaRequirementRepository();
    const petRepository = new PrismaPetRepository();
    const GetPetRequirement = new GetPetRequirementsUseCase(
      requirementRepository,
      petRepository
    );

    const requirement = await GetPetRequirement.execute({
      petId: id,
    });

    return reply.status(200).send(requirement);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }
}
