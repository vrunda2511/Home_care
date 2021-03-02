const express=require('express');
const router=express.Router();
const {isSignedIn}=require('../../Customer/controller/user')

var SubServiceManagement=require('../controller/subservice');

router.post('/AddSubService',isSignedIn,function(req,res){
    return SubServiceManagement.AddSubService(req,res);
});

router.put('/UpdateSubService/:id',isSignedIn,function(req,res){
    return SubServiceManagement.UpdateSubService(req,res);
})

router.delete('/DeleteSubService/:id',isSignedIn,function(req,res){
    return SubServiceManagement.DeleteSubService(req,res);
})

module.exports=router;