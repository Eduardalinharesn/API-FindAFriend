import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { app } from '../../app';
import request from 'supertest';

describe('Register tutor(e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to register a tutor', async () => {
    const response = await request(app.server).post('/users/tutor').send({
      name: 'Claudio',
      address: 'Rua Piedade',
      cep: '0000000000',
      city: 'Tubarão',
      email: 'claudio@email',
      password: '123456',
      phone: '000000000',
      uf: 'SC',
    });

    expect(response.statusCode).toEqual(201);
  });
});
