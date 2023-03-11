const express=require('express')
const router=express.Router()
const{createUser,getUsers,loginUser,updateUser,deleteUser}=require('../controller/userController')
const {authentication,authorization}=require('../auth/auth')


router.post('/users',createUser)
router.post('/login',loginUser)
router.get('/users',authentication,getUsers)
router.put('/users/:userId',authentication,authorization,updateUser)
router.delete('/users/:userId',authentication,authorization,deleteUser)

router.all('/*',(req,res)=>{
    return res.status(404).send({status:false,message:"Check Url, it is not correct"})
})

module.exports=router
