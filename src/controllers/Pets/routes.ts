import { FastifyInstance } from 'fastify';
import { register } from './register';
import { GetPet } from './get-pet';
import { ListPetsByCity } from './list-pets-by-city';
import { FilterPets } from './filter-pets';

const FilterPetsSchema = {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        energy_level: { type: 'number' },
        dependency_level: { type: 'number' },
      },
      required: [],
    },
  },
};

export async function PetsRoutes(app: FastifyInstance) {
  app.post('/pets', register);
  app.get('/pets/:id', GetPet);
  app.get('/pets/list/:city', ListPetsByCity);
  app.get('/pets/filter', FilterPetsSchema, FilterPets);
}
