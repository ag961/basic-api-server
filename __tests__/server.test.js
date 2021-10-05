'use strict';

const { server } = require('../src/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);
const { db } = require('../src/models/index.js');

beforeAll(async() => {
  await db.sync();  
});

afterAll(async () => {
  await db.drop()
});

describe('api server', ()=>{

  it('Should respond with 404 on a bad route', async () => {
    const response = await mockRequest.get('/fakeroute');
    expect(response.status).toBe(404)
  });

  it('Should respons with 404 on a bad method', async () => {
    const response = await mockRequest.patch('/fruits/1');
    expect(response.status).toBe(404);
  });

  it('Should correctly respond to creating a fruit', async ()=>{
    const response = await mockRequest.post('/fruits').send({
      name : "pineapple",
      color: "yellow"
    });
    expect(response.body.name).toEqual('pineapple');
    expect(response.body.id).toBeDefined();
  })

  it('Should correctly respond to getting a fruit from DB', async ()=>{
    const response = await mockRequest.get('/fruits');
    console.log(response.body);
    // expect(response.body.name).toEqual('pineapple');
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(1);
  })

  it('Should correctly respond to getting one fruit from DB', async ()=>{
    const response = await mockRequest.get('/fruits/1');
    console.log(response.body);
    expect(response.body.name).toEqual('pineapple');
    expect(response.status).toBe(200);
    expect(typeof response.body).toEqual('object')
  })

  it('Should update a color property of a record', async ()=>{
    const data = { color: 'green'}
    const response = await mockRequest.put('/fruits/1').send(data);
    console.log(response.body);
    expect(response.body.name).toEqual('pineapple');
    expect(response.status).toBe(200);
    expect(response.body.color).toEqual(data.color);
  })

  it('Should delete a single record in teh database', async ()=>{
    const response = await mockRequest.delete('/fruits/1');
    console.log(response.body);
    expect(response.body.name).toBeFalsy();
    expect(response.status).toBe(200);
    expect(response.body).toEqual(1);
  })

}) 