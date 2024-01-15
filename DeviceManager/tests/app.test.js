const request = require("supertest");
const {app,connection, closeConnection} = require("../src/app");
const Sequelize = require('sequelize');
const DbClient = require("../DB/db-connection");
const { response } = require("express");
const models = require(`../DB/models`);

//console.log('server is ', server);

// describe('api test', () => {

//     describe('get test', () => {

//         test('get deviceinfo', async () => { 

//             const response = await request(app).get('/api/v1/device');

//             expect(response.statusCode).toBe(200);
//             expect(response.body.length).toBeGreaterThan(0);

//         });
//     });
// });





// const connection = createConnection({
//     host: "127.0.0.1",
//     user: "root",
//     password: "baby090814",
//     multipleStatements: true,
//   });

// beforeEach(async () => {
//   connection.connect();
//   connection.query("use DeviceDB"); 
// });

// afterEach(async ()=>{
  
// })

beforeAll(async() => {
  await connection();
});

// afterAll( async() => {
//   //await server.close();
// });

afterAll(async()=> {
  await closeConnection();
})


test('get sn;00005 device info, responds with json', function(done) {
  request(app)
    .get('/api/v1/device/00005')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
});

test('get all device info, responds with json', function(done) {
  request(app)
    .get('/api/v1/device')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
});

test('add device info, responds with json', function(done) {
  request(app)
    .post('/api/v1/device')
    .send({
      'sn': 'xxxxx',
      'name': 'iphone15',
      'model': 'A9999',
      'grade': '512gb',
    })
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        console.log(res.body);
        expect(res.body.device.name).toEqual("iphone15aa");
        done();
      });
});

test('get all device info, responds with json', function(done) {
  request(app)
    .delete('/api/v1/device')
    .send({
      'sn': 'xxxxx'
    })
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        console.log(res.body);
        done();
      });
});

// describe('GET /api/v1/device',  function() {
//     it('responds with json', async function() {
//       const response = await request(app)
//         .get('/api/v1/device/aaaaa')

//       expect(response.status).toEqual(200);
//       expect(res.body.length).toBeGreaterThan(0);
//     });
//   });

// describe("GET /api/products", () => {
//     it('gets the device info', async () => {
//         const response = await request(app).get("/api/v1/device")
      
//         expect(response.status).toBe(200)
//         expect(response.body.length).toBeGreaterThan(0);
//       })
//   });
