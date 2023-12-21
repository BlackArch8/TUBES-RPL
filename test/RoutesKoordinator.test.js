import{jest} from '@jest/globals'
import request from 'supertest';
import express from 'express';
import { KoordinatorRoute } from '../routes/Koordinator/RouteKoordinator'; 

const app = express();
app.use('/', KoordinatorRoute);

describe('Testing Koordinator Routes', () => {
  it('should get Koordinator dashboard', async () => {
    const res = await request(app).get('/koordinator/dashboard');
    expect(res.statusCode).toBe(200); 
  });

  it('should get Koordinator Penugasan', async () => {
    const res = await request(app).get('/koordinator/penugasan');
    expect(res.statusCode).toBe(200);
    
  });

  it('should get List-asdos', async () => {
    const res = await request(app).get('/koordinator/list-asdos');
    expect(res.statusCode).toBe(200);
   
  });

  it('should get Jadwal', async () => {
    const res = await request(app).get('/koordinator/jadwal');
    expect(res.statusCode).toBe(200);
   
  });


it('should get Tambah Matkul', async () => {
    const res = await request(app).get('/koordinator/tambah-matkul');
    expect(res.statusCode).toBe(200);
  });

  it('should get Setting', async () => {
    const res = await request(app).get('/koordinator/setting');
    expect(res.statusCode).toBe(200);
   
  });



 
});
