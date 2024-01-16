const express = require(`express`);

const app = express();
const models = require(`../DB/models`);

app.use(express.json());
app.use(express.urlencoded());

/** Get All Device Info */
app.get(`/api/v1/device`,async (req,res,next)=>{
    try {
        let list = await models.Devices.findAll();
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
            let device = await models.Devices.findOne({
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
        let { name, sn, model, grade, owner, underMaintenance, country, city} = req.body;
        // input check
        var regName = /\w{3,5}/;
        var regSN = /^[0-9a-zA-Z]{5}$/;
        var regModel = /\w{3,10}/;
        var regGrade = /^[0-9a-zA-Z]{3,5}$/;
        var regOwner = /^[0-9a-zA-Z]{3,15}$/;
        var regUnderMaintenance;
        var regCountry = /^[a-zA-Z]{1,15}$/;
        var regCity = /^[a-zA-Z]{1,15}$/;

        var regRes = true;
        
        if(!regSN.test(sn)){
            res.status(403).json({
                message:`wrong sn`
            })
            regRes = false;
        }else{
            let thesame = await models.Devices.findOne({
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
        if(!regOwner.test(owner)){
            res.status(403).json({
                message:`wrong owner`
            })
            regRes = false;
        }
        if(!regCountry.test(country)){
            res.status(403).json({
                message:`wrong country`
            })
            regRes = false;
        }
        if(!regCity.test(city)){
            res.status(403).json({
                message:`wrong city`
            })
            regRes = false;
        }

        if(regRes){
            let device = await models.Devices.create({
                name,
                sn,
                model,
                grade,
                owner,
                underMaintenance,
                country,
                city
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
        let { name, sn, model, grade, owner, underMaintenance, country, city} = req.body;

        // input check needs update
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
            let device = await models.Devices.findOne({
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
            let device = await models.Devices.findOne({
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

app.listen(3000, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", 3000);
})