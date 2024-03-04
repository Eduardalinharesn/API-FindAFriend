import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { app } from '../../app';
import request from 'supertest';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcrypt';

describe('Get user (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get a user', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Patinha Unidas8',
        address: 'Rua Piedade',
        cep: '0000000000',
        city: 'Tubarão',
        email: 'patinhas8@email.com',
        password: await hash('123456', 6),
        phone: '000000000',
        uf: 'SC',
        owner_name: 'Fabio',
      },
    });

    const authResponse = await request(app.server).post('/auth').send({
      email: 'patinhas8@email.com',
      password: '123456',
    });

    const { token } = authResponse.body;

    const response = await request(app.server)
      .get('/profile')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.user).toEqual(
      expect.objectContaining({
        email: 'patinhas8@email.com',
      })
    );
  });
});
