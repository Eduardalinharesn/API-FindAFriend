import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { PrismaPetRepository } from '../../repositories/prisma/prisma-pet-repository';
import { ResourceNotFoundError } from '../../use-cases/errors/resorce-not-found.error';
import { PrismaRequirementRepository } from '@/repositories/prisma/prisma-requirement';
import { CreateRequirementCase } from '@/use-cases/create-requirement';

export async function CreateRequirement(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const registerBodySchema = z.object({
      pet_id: z.string(),
      description: z.string(),
    });

    const { pet_id, description } = registerBodySchema.parse(request.body);
    const requirementRepository = new PrismaRequirementRepository();
    const petRepository = new PrismaPetRepository();
    const CreateRequirement = new CreateRequirementCase(
      requirementRepository,
      petRepository
    );

    await CreateRequirement.execute({
      pet_id: pet_id,
      description: description,
    });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }
  return reply.status(201).send();
}
