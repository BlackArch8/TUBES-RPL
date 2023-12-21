import{jest} from '@jest/globals'
import request from 'supertest';
import express from 'express';
import { DosenRoute } from '../routes/Dosen/RoutesDosen'; 

const app = express();
app.use('/', DosenRoute);

describe('Testing Dosen Routes', () => {
  it('should get Dosen dashboard', async () => {
    const res = await request(app).get('/dosen/dashboard-dosen');
    expect(res.statusCode).toBe(200); 
  });

  it('should get Dosen jadwal', async () => {
    const res = await request(app).get('/dosen/jadwal-dosen');
    expect(res.statusCode).toBe(200);
    
  });

  it('should get Dosen input-asisten', async () => {
    const res = await request(app).get('/dosen/input-asisten');
    expect(res.statusCode).toBe(200);
   
  });

  it('should get Dosen setting', async () => {
    const res = await request(app).get('/dosen/setting-dosen');
    expect(res.statusCode).toBe(200);
   
  });

 
});
