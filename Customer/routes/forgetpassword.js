const express=require('express');
const router=express.Router();
 
var forgetpass=require('../controller/forgetpassword');

router.post('/ForgetPassword',(req,res)=>{
    return forgetpass.ForgetPassword(req,res);
})

router.put('/UpdatePassword',(req,res)=>{
    return forgetpass.UpdatePassword(req,res);
})

module.exports=router;