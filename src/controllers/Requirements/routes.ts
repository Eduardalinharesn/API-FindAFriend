import { FastifyInstance } from 'fastify';
import { CreateRequirement } from './create-requirement';
import { GetRequirement } from './get-requirements';

export async function RequirementRoutes(app: FastifyInstance) {
  app.post('/requirement', CreateRequirement);
  app.get('/requirement/:id', GetRequirement);
}
