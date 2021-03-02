const express=require('express');
const router=express.Router();
const {isSignedIn}=require('../../Customer/controller/user')

var ServiceManagement=require('../controller/service');

router.post('/AddService',isSignedIn,function(req,res){
    return ServiceManagement.AddService(req,res);
});

router.put('/UpdateService/:id',isSignedIn,function(req,res){
    return ServiceManagement.UpdateService(req,res);
});

router.delete('/DeleteService/:id',isSignedIn,function(req,res){
    return ServiceManagement.DeletedService(req,res);
});



module.exports=router;