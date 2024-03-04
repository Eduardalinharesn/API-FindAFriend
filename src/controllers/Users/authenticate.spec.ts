import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it, test } from 'vitest';
import { app } from '@/app';

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to authenticate', async () => {
    await request(app.server).post('/users/org').send({
      name: 'Patinha Unidas7',
      address: 'Rua Piedade',
      cep: '0000000000',
      city: 'Tubarão',
      email: 'patinhas7@email.com',
      password: '123456',
      phone: '000000000',
      uf: 'SC',
      owner_name: 'Fabio',
    });

    const response = await request(app.server).post('/auth').send({
      email: 'patinhas7@email.com',
      password: '123456',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
