import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { app } from '../../app';
import request from 'supertest';

describe('Register org (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to register a org', async () => {
    const response = await request(app.server).post('/users/org').send({
      name: 'Patinha Unidas9',
      address: 'Rua Piedade',
      cep: '0000000000',
      city: 'Tubarão',
      email: 'patinhas9@email',
      password: '123456',
      phone: '000000000',
      uf: 'SC',
      owner_name: 'Fabio',
    });

    expect(response.statusCode).toEqual(201);
  });
});
