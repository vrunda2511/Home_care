const express=require('express');
const router=express.Router();
 
var forgetpass=require('../controller/forgetpassword');

router.post('/ForgetPassword',(req,res)=>{
    return forgetpass.ForgetPassword(req,res);
})


module.exports=router;