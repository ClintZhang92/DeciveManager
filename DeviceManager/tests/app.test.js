const request = require("supertest");
const {app,connection, closeConnection} = require("../src/app");
const Sequelize = require('sequelize');
const DbClient = require("../DB/db-connection");
const { response } = require("express");
const models = require(`../DB/models`);

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
