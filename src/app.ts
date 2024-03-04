import fastifyJwt from '@fastify/jwt';
import fastify from 'fastify';
import cookie from '@fastify/cookie';
import { UserRoutes } from './controllers/Users/routes';
import { env } from './env';
import { PetsRoutes } from './controllers/Pets/routes';
import { RequirementRoutes } from './controllers/Requirements/routes';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';

export const app = fastify().withTypeProvider<JsonSchemaToTsProvider>();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(cookie);
app.register(UserRoutes);
app.register(PetsRoutes);
app.register(RequirementRoutes);
