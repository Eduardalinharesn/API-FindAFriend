import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it, test } from 'vitest';
import { app } from '@/app';
import { prisma } from '@/lib/prisma';

describe('Get pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get a single pet', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Patinha Unidas2',
        address: 'Rua Piedade',
        cep: '0000000000',
        city: 'Tubarão',
        email: 'patinhas2@email',
        password: '123456',
        phone: '000000000',
        uf: 'SC',
        owner_name: 'Fabio',
      },
    });

    const pet = await prisma.pet.create({
      data: {
        name: 'Lola',
        type: 'dog',
        age: 'puppy',
        size: 'medium',
        energy_level: 4,
        dependency_level: 3,
        description: 'cute and fun',
        org_id: user.id,
      },
    });

    const response = await request(app.server).get(`/pets/${pet.id}`);
    expect(response.statusCode).toEqual(200);
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        name: 'Lola',
      })
    );
  });
});
