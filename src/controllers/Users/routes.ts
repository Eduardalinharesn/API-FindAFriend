import { FastifyInstance } from 'fastify';
import { registerOrg } from './register-org';
import { authenticate } from './authenticate';
import { GetUser } from './get-users';
import { registerTutor } from './register-tutor';
import { verifyJWT } from '@/middlewares/verify-jwt';

export async function UserRoutes(app: FastifyInstance) {
  app.post('/users/org', registerOrg);
  app.post('/users/tutor', registerTutor);
  app.post('/auth', authenticate);
  app.get('/profile', { onRequest: [verifyJWT] }, GetUser);
}
