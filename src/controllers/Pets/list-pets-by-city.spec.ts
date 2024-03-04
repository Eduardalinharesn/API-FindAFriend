import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it, test } from 'vitest';
import { app } from '@/app';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcrypt';

describe('List by city (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to list by city', async () => {
    const user1 = await prisma.user.create({
      data: {
        name: 'Patinha Unidas3',
        address: 'Rua Piedade',
        cep: '0000000000',
        city: 'Tubarão',
        email: 'patinhas3@email.com',
        password: await hash('123456', 6),
        phone: '000000000',
        uf: 'SC',
        owner_name: 'Fabio',
      },
    });

    const user2 = await prisma.user.create({
      data: {
        name: 'Patinha Unidas4',
        address: 'Rua Piedade',
        cep: '0000000000',
        city: 'Laguna',
        email: 'patinhas4@email.com',
        password: await hash('123456', 6),
        phone: '000000000',
        uf: 'SC',
        owner_name: 'Fabio',
      },
    });

    await request(app.server).post('/pets').send({
      name: 'Leo',
      type: 'dog',
      age: 'puppy',
      size: 'medium',
      energy_level: 4,
      dependency_level: 3,
      description: 'cute and fun',
      org_id: user1.id,
    });

    const post = await request(app.server).post('/pets').send({
      name: 'Nina',
      type: 'dog',
      age: 'puppy',
      size: 'medium',
      energy_level: 4,
      dependency_level: 3,
      description: 'cute and fun',
      org_id: user2.id,
    });

    const response = await request(app.server)
      .get(`/pets/list/${user2.city}`)
      .send({ someParam: 'someValue' });

    expect(response.statusCode).toEqual(200);
    expect(response.body.pets).toHaveLength(1);
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Nina',
      }),
    ]);
  });
});
