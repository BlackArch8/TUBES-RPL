import{jest} from '@jest/globals'
import request from 'supertest';
import express from 'express';
import { asdosRoute } from '../routes/Asdos/RoutesAsdos'; 

const app = express();
app.use('/', asdosRoute);

describe('Testing Asdos Routes', () => {
  it('should get Asdos dashboard', async () => {
    const res = await request(app).get('/asdos/dashboard');
    expect(res.status).toBe(200);
  });

  it('should get Asdos jadwal', async () => {
    const res = await request(app).get('/asdos/jadwal');
    expect(res.status).toBe(200);
  });

  it('should get Asdos setting', async () => {
    const res = await request(app).get('/asdos/setting');
    expect(res.status).toBe(200);
      });
});
