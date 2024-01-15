const express = require(`express`);
//const bodyParser = require(`body-parser`);
const Sequelize = require('sequelize');

const app = express();

const models = require(`../DB/models`);

app.use(express.json());
app.use(express.urlencoded());
//app.use(bodyParser.urlencoded({extended:true}));

/** Get All Device Info */
app.get(`/api/v1/device`,async (req,res,next)=>{
    try {
        let list = await models.DeviceInfo.findAll();
        if(list){
            res.json({
                list,
                message:`Device search success`
            })
        }else{
            res.json({
                message:`Device search failed`
            })
        }

    } catch (error) {
        next(error)
    }
})

/** Get One Device Info From SN*/
app.get(`/api/v1/device/:sn`,async (req,res,next)=>{
    try {
        let {sn} = req.params;
        // input check
        var regSN = /^[0-9a-zA-Z]{5}$/;
        //var reg = /\w/;
        if(!regSN.test(sn)){
            res.status(403).json({
                message:`wrong sn`
            })
        }else{
            let device = await models.DeviceInfo.findOne({
                where:{
                    sn
                }
            })
            if(device){
                res.status(200).json({
                    device
                })
            }else{
                res.status(200).json({
                    message:`Device search failed`
                })
            }
        }
    } catch (error) {
        next(error)
    }
})

/** Add Device */
app.post(`/api/v1/device/`,async (req,res,next)=>{
    try {
        let { name, sn, model, grade} = req.body;
        // input check
        var regName = /\w{3,5}/;
        var regSN = /^[0-9a-zA-Z]{5}$/;
        var regModel = /\w{3,10}/;
        var regGrade = /^[0-9a-zA-Z]{3,5}$/;
        var regRes = true;
        
        if(!regSN.test(sn)){
            res.status(403).json({
                message:`wrong sn`
            })
            regRes = false;
        }else{
            let thesame = await models.DeviceInfo.findOne({
                where:{
                    sn
                }
            })
            if(thesame){
                res.json({
                    message:`Exist same device`
                })
            }
        }
        if(!regName.test(name)){
            res.status(403).json({
                message:`wrong name`
            })
            regRes = false;
        }
        if(!regModel.test(model)){
            res.status(403).json({
                message:`wrong model`
            })
            regRes = false;
        }
        if(!regGrade.test(grade)){
            res.status(403).json({
                message:`wrong grade`
            })
            regRes = false;
        }
        if(regRes){
            let device = await models.DeviceInfo.create({
                name,
                sn,
                model,
                grade,
            })
            res.status(200).json({
                device,
                message:`Add device success`
            }) 
            
        }
    } catch (error) {
        next(error)
    }
})

/** Update Device */
app.put(`/api/v1/device`, async (req,res,next)=>{
    try {
        let { name, sn, model, grade} = req.body;

        // input check
        var regName = /\w{3,5}/;
        var regSN = /^[0-9a-zA-Z]{5}$/;
        var regModel = /\w{3,10}/;
        var regGrade = /^[0-9a-zA-Z]{3,5}$/;
        var regRes = true;
        
        if(!regSN.test(sn)){
            res.status(403).json({
                message:`wrong sn`
            })
            regRes = false;
        }
        if(!regName.test(name)){
            res.status(403).json({
                message:`wrong name`
            })
            regRes = false;
        }
        if(!regModel.test(model)){
            res.status(403).json({
                message:`wrong model`
            })
            regRes = false;
        }
        if(!regGrade.test(grade)){
            res.status(403).json({
                message:`wrong grade`
            })
            regRes = false;
        }
        if(regRes){
            let device = await models.DeviceInfo.findOne({
                where:{
                    sn
                }
            })
            if(device){
                device = await device.update({
                    name,
                    model,
                    grade,
                })
                res.status(200).json({
                    device,
                    message:`Device update success`
                })
            }else{
                res.status(200).json({
                    message:`Device search failed`
                })
            }
        }
        
    } catch (error) {
        next(error)
    }
})

/** Delete Device */
app.delete(`/api/v1/device`,async (req,res,next)=>{
    try {
        let { sn } = req.body;
        // input check
        var regSN = /^[0-9a-zA-Z]{5}$/;
        //var reg = /\w/;
        if(!regSN.test(sn)){
            res.status(403).json({
                message:`wrong sn`
            })
        }else{
            let device = await models.DeviceInfo.findOne({
                where:{
                    sn
                }
            })
            if(device){
                device = await device.destroy();
                res.status(200).json({
                    message:`Device info deleted`
                })
            }else{
                res.status(200).json({
                    message:`Device search failed`
                })
            }
        }
        
    } catch (error) {
        next(error)
    }
})


const dbConfig = new Sequelize('DeviceDB', 'root', 'baby090814', {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    logging: false,
    timestamps: false,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
  });

const connection = () => {
        //dbConfig.authenticate();
};


const closeConnection = () => {
    dbConfig.close();
  };

// const  dbStart = 
//     dbConfig.authenticate()
//   .then(() => {
//    console.log('Connection has been established successfully.');
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   });

module.exports = {
    app,
    connection,
    closeConnection,
}

/** Error */
// app.use((err,req,res,next)=>{
//     if(err){
//         res.status(500).json({
//             message:err.message
//         })
//     }
// })

// let server = app.listen(`3000`,()=>{
//     console.log(`Server Start`)
// });

// module.exports = server;