// const Sequelize = require('sequelize');

// const dbConfig = new Sequelize('DeviceDB', 'root', 'baby090814', {
//     dialect: 'mysql',
//     host: '127.0.0.1',
//     port: 3000,
//     logging: false,
//     timestamps: false,
//     pool: {
//         max: 5,
//         min: 0,
//       }
//   });

// const DbClient = dbConfig.authenticate()
//   .then(() => {
//    console.log('Connection has been established successfully.');
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   });

// module.exports =  DbClient;