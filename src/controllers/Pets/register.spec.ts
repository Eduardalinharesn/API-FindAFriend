import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it, test } from 'vitest';
import { app } from '@/app';
import { prisma } from '@/lib/prisma';

describe('register Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to register a pet', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Patinha Unidas5',
        address: 'Rua Piedade',
        cep: '0000000000',
        city: 'Tubarão',
        email: 'patinhas5@email',
        password: '123456',
        phone: '000000000',
        uf: 'SC',
        owner_name: 'Fabio',
      },
    });

    const profileResponse = await request(app.server).post('/pets').send({
      name: 'lola',
      type: 'dog',
      age: 'puppy',
      size: 'medium',
      energy_level: 4,
      dependency_level: 3,
      description: 'cute and fun',
      org_id: user.id,
    });

    expect(profileResponse.statusCode).toEqual(201);
  });
});
