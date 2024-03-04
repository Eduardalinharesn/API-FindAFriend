import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it, test } from 'vitest';
import { app } from '@/app';
import { prisma } from '@/lib/prisma';

describe('Create Requirement (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a requirement', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Patinha Unidas6',
        address: 'Rua Piedade',
        cep: '0000000000',
        city: 'Tubarão',
        email: 'patinhas6@email',
        password: '123456',
        phone: '000000000',
        uf: 'SC',
        owner_name: 'Fabio',
      },
    });

    const pet = await prisma.pet.create({
      data: {
        name: 'Dora',
        type: 'dog',
        age: 'puppy',
        size: 'medium',
        energy_level: 4,
        dependency_level: 3,
        description: 'cute and fun',
        org_id: user.id,
      },
    });

    const profileResponse = await request(app.server)
      .post('/requirement')
      .send({
        pet_id: pet.id,
        description: 'Needs big spaces',
      });

    expect(profileResponse.statusCode).toEqual(201);
  });
});
