const models = require(`../DB/models`);

/** Get All Device Info*/
const getAllDevice = (async (req,res,next)=>{
    try {
        let deviceInfo = await models.Devices.findAll();
        if(deviceInfo){
            res.status(200).json({
                deviceInfo,
                message:`Device search success`
            })
        }else{
            res.status(200).json({
                message:`Device search failed`
            })
        }

    } catch (error) {
        next(error)
    }
})

/** Get One Device Info From SN*/
const getOneDevice = (async (req,res,next)=>{
    try {
        let {sn} = req.params;
        // input check
        var regSN = /^[0-9a-zA-Z]{1,15}$/;
        //var reg = /\w/;
        if(!regSN.test(sn)){
            res.status(200).json({
                message:`wrong sn`
            })
        }else{
            let deviceInfo = await models.Devices.findOne({
                where:{
                    sn
                }
            })
            if(deviceInfo){
                res.status(200).json({
                    deviceInfo
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
const addDevice = (async (req,res,next)=>{
    console.log(req.body);
    try {
        let { name, sn, model, grade, owner, underMaintenance, country, city} = req.body;
        console.log(underMaintenance);
        // input check
        var regName = /\w{1,15}/;
        var regSN = /\w{1,15}/;
        var regModel = /\w{1,15}/;
        var regGrade = /\w{1,15}/;
        var regOwner = /\w{1,15}/;
        var regUnderMaintenance = /\w{1,15}/;
        var regCountry = /\w{1,15}/;
        var regCity = /\w{1,15}/;

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
                regRes = false;
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
        if(!regUnderMaintenance.test(owner)){
            res.status(403).json({
                message:`wrong underMaintenance`
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
            let deviceInfo = await models.Devices.create({
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
                deviceInfo,
                message:`Add device success`
            }) 
            
        }
    } catch (error) {
        next(error)
    }
})

/** Update Device */
const updateDevice = (async (req,res,next)=>{
    try {
        let { name, sn, model, grade, owner, underMaintenance, country, city} = req.body;
        // input check
        var regName = /\w{1,15}/;
        var regSN = /\w{1,15}/;
        var regModel = /\w{1,15}/;
        var regGrade = /\w{1,15}/;
        var regOwner = /\w{1,15}/;
        var regUnderMaintenance = /\w{1,15}/;
        var regCountry = /\w{1,15}/;
        var regCity = /\w{1,15}/;

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
        if(!regOwner.test(owner)){
            res.status(403).json({
                message:`wrong owner`
            })
            regRes = false;
        }
        if(!regUnderMaintenance.test(owner)){
            res.status(403).json({
                message:`wrong underMaintenance`
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
            let deviceInfo = await models.Devices.findOne({
                where:{
                    sn
                }
            })
            if(deviceInfo){
                deviceInfo = await deviceInfo.update({
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
const deleteDevice = (async (req,res,next)=>{
    try {
        let { sn } = req.body;
        // input check
        var regSN = /^[0-9a-zA-Z]{1,15}$/;
        //var reg = /\w/;
        if(!regSN.test(sn)){
            res.status(403).json({
                message:`wrong sn`
            })
        }else{
            let deviceInfo = await models.Devices.findOne({
                where:{
                    sn
                }
            })
            if(deviceInfo){
                deviceInfo = await deviceInfo.destroy();
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

module.exports = {
    getAllDevice,
    getOneDevice,
    addDevice,
    updateDevice,
    deleteDevice
}