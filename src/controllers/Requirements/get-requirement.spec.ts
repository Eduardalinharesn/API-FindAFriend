import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it, test } from 'vitest';
import { app } from '@/app';
import { prisma } from '@/lib/prisma';

describe('Get Requirements (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get requirements of a pet', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Patinha Unidas10',
        address: 'Rua Piedade',
        cep: '0000000000',
        city: 'Tubarão',
        email: 'patinhas10@email',
        password: '123456',
        phone: '000000000',
        uf: 'SC',
        owner_name: 'Fabio',
      },
    });

    const pet = await prisma.pet.create({
      data: {
        name: 'Tito',
        type: 'dog',
        age: 'puppy',
        size: 'medium',
        energy_level: 4,
        dependency_level: 3,
        description: 'cute and fun',
        org_id: user.id,
      },
    });

    const requirement1 = await prisma.requirement.create({
      data: {
        pet_id: pet.id,
        description: 'should not be an apartment',
      },
    });

    const requirement2 = await prisma.requirement.create({
      data: {
        pet_id: pet.id,
        description: 'need medical attention',
      },
    });

    const Response = await request(app.server)
      .get(`/requirement/${pet.id}`)
      .send({ someParam: 'someValue' });

    expect(Response.statusCode).toEqual(200);
    expect(Response.body.requirement).toHaveLength(2);
  });
});
