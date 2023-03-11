const userModel=require('../model/userModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const dateFromate=function(date){
    return /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i.test(date)
}

const pincodeCheck=function(pin){
return /^[1-9]{1}\d{2}\s?\d{3}$/gm.test(pin)
}


const createUser=async function(req,res){
    try {
         let {name, gender, dob,email,password, city, state, pincode}=req.body

         if(!name ||  !gender || !dob || !email || !password || !city ||  !state || !pincode){
            return res.state(400).send({status:false,message:"For Registering user 'name', 'gender', 'dob', 'email' , 'password' , 'city', 'state', 'pincode' all of these fileds are required"})
         }

         if(!['male','female','other'].includes(gender)){
            return res.status(400).send({status:false,message:"please choose gender either 'male' or 'female' or 'other', do not make any spelling mistake "})
         }
          
         if(!dateFromate(dob)){
            return res.status(400).send({status:false, message:"For 'dob' please use DD/MM/YYYY formate"})
         }
          
         if(!pincodeCheck(pincode)){
            return res.status(400).send({status:false, message:"please enter valid 6 digit pincode"})
         }


         let existEmail = await userModel.findOne({ email: email });
            if (existEmail) {
                return res
                    .status(400)
                    .send({
                        status: false,
                        message: "User with this email is already registered, use another email",
                    });
            }

         password = await bcrypt.hash(password, 10);

         const createData=await userModel.create({name, gender, dob,email,password, city, state, pincode})

         return res.status(201).send({status:true,message:"User Registered sucessFully you can login now", data:createData})
        
    } catch (err) {
        return res.status(500).send({status:false,error:err.message})
    }
}





const getUsers=async function(req,res){
    try {
      
        const getData=await userModel.find()

        if(getData.length==0){
            return res.status(200).send({status:true,message:"No users found", data:getData})
        }
        return res.status(200).send({status:true,message:"User List", totalUsers:getData.length,data:getData})

    } catch (err) {
        return res.status(500).send({status:false,error:err.message})
    }
}


require('dotenv').config();

const loginUser = async function (req, res) {
    try {
      let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ status: false, message: "for login user email and password both are required" })
        }
      const user = await userModel.findOne({ email: email});
      if (!user) {
        return res.status(400).send({ status: false, message: "Please enter your correct emailId" });
      }
      let hpassword = await bcrypt.compare(password,user.password)
      if(hpassword==false)return res.status(400).send({status:false,message:"Please enter your correct password"})

      let exp = "20h";
      const token = jwt.sign(
        { userId: (user._id).toString() },
        process.env.SecreteKey,
        { expiresIn: exp }
      );
      let datatoShow= {token:token,exp:exp}
     return res.status(201).send({ status: true, message: "Login successfully...!", data: datatoShow });
    } catch (error) {
    return  res.status(500).send({ status: false, err: error.message });
    }
  };

const updateUser=async function(req,res){
    try {
        let {name, gender, dob,email,password, city, state, pincode}=req.body
        const userId=req.params.userId

        
        
        const dataToUpdate={}
        if(!name ||  !gender || !dob || !email || !password || !city ||  !state || !pincode){
            return res.status(400).send({status:false,message:"For update user 'name', 'gender', 'dob', 'email' , 'password', 'city', 'state', 'pincode' at least one of these fileds are required"})
         }

         if(name){
            dataToUpdate['name']=name
         }
         if(gender){
            if(!['male','female','other'].includes(gender)){
                return res.status(400).send({status:false,message:"please choose gender either 'male' or 'female' or 'other', do not make any spelling mistake "})
             }
            dataToUpdate['gender']=gender
         }

         if (email) {
           
            let existEmail = await userModel.findOne({ email: email });
            if (existEmail) {
                return res
                    .status(400)
                    .send({
                        status: false,
                        message: "User with this email is already registered, use another email",
                    });
            }
            dataToUpdate["email"]=email
        }
        if (password) {
            password = await bcrypt.hash(password, 10);
            dataToUpdate["password"]=password 
        }
         if(dob){
            if(!dateFromate(dob)){
                return res.status(400).send({status:false, message:"For 'dob' please use DD/MM/YYYY formate"})
             }
            dataToUpdate['dob']=dob
         }
         if(city){
            dataToUpdate['city']=city
         }
         if(state){
            dataToUpdate['state']=state
         }
         if(pincode){
            if(!pincodeCheck(pincode)){
                return res.status(400).send({status:false, message:"please enter valid 6 digit pincode"})
             }
            dataToUpdate['pincode']=pincode
         }

         const updateData=await userModel.findByIdAndUpdate(userId,
           {$set: dataToUpdate},
            {new:true}
            )

         return res.status(200).send({status:true,message:"User Details updated", data:updateData})        
    } catch (err) {
        return res.status(500).send({status:false,error:err.message})
    }
}


const deleteUser=async function(req,res){
    try {
        const userId=req.params.userId
    
        const checkUser=await userModel.findById(userId)
        
        if(checkUser.isDeleted==true){
            return res.status(400).send({status:false, message:"No user found or it may be deleted"})
        } 

        const updateData=await userModel.findByIdAndUpdate(userId,
            {$set: {isDeleted:true,deletedAt:new Date()}},
             {new:true}
             )    
 
    return res.status(200).send({status:true, message:"User deleted Sucessfully"})
        
    } catch (err) {
        return res.status(500).send({status:false,error:err.message})
    }
}



module.exports={createUser,getUsers,loginUser,updateUser,deleteUser}