const jwt = require("jsonwebtoken");
const mongoose=require('mongoose')
const isValidObjectId = (ObjectId) => {

    return mongoose.Types.ObjectId.isValid(ObjectId)
}

require('dotenv').config();


const authentication = (req, res, next) => {
    try {
        let token = req.headers["authorization"];
        if (!token)
            return res.status(401).send({ status: false, msg: "token is required" });
           token=token.slice(7)
        jwt.verify(token,process.env.SecreteKey, (error, decoded) =>{
            if (error) {
               let message=(error.message=="jwt expired"?"token is expired,please login again":"token is invalid,not authenticated")
                 return res.status(401).send({ status: false, msg:message });
            } else {
              req.token = decoded;
              console.log("authentication done")
                next(); }
        });
    } catch (error) {
        res.status(500).send({ status: false, err: error.message });
    }
};


const authorization = async (req,res,next)=>{
    try {
        let tokenUSerID=req.token.userId
        let userid=req.params.userId
        console.log(userid,tokenUSerID)
        if(!isValidObjectId(userid)){return res.status(400).send({status:false,message:"plz enter valid userId"})};
        if(userid!==tokenUSerID){
            console.log("authorization not done")
            return res.status(403).send({status:false,message:"you are not authorised, try to login with the same account that you are going to alter"})
        }
        else{
            console.log("authorization done")
            next()
        }
    } catch (error) {
        
    }
}
module.exports={authentication,authorization}