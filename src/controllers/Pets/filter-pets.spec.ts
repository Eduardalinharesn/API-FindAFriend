import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it, test } from 'vitest';
import { app } from '@/app';
import { prisma } from '@/lib/prisma';

describe('Filter pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to filter pets', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Patinha Unidas',
        address: 'Rua Piedade',
        cep: '0000000000',
        city: 'Tubarão',
        email: 'patinhas@email',
        password: '123456',
        phone: '000000000',
        uf: 'SC',
        owner_name: 'Fabio',
      },
    });

    const pet1 = await prisma.pet.create({
      data: {
        name: 'Toto',
        type: 'dog',
        age: 'puppy',
        size: 'medium',
        energy_level: 4,
        dependency_level: 3,
        description: 'cute and fun',
        org_id: user.id,
      },
    });

    const pet2 = await prisma.pet.create({
      data: {
        name: 'Toto',
        type: 'cat',
        age: 'puppy',
        size: 'medium',
        energy_level: 4,
        dependency_level: 3,
        description: 'cute and fun',
        org_id: user.id,
      },
    });

    const response = await request(app.server).get('/pets/filter').query({
      name: pet1.name,
      type: pet1.type,
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body.pets).toHaveLength(1);
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Toto',
        type: 'dog',
      }),
    ]);
  });
});
