const express=require('express');
const router=express.Router();
const {isSignedIn}=require('../../Customer/controller/user')

var ManageProvider=require('../controller/provider')

router.post('/AddProvider',(req,res)=>{
    return ManageProvider.AddProvider(req,res);
})
router.put('/UpdateProvider/:id',(req,res)=>{
    return ManageProvider.UpdateProvider(req,res);
})

router.delete('/Deleteprovider/:id',(req,res)=>{
    return ManageProvider.Deleteprovider(req,res);
})

router.get('/ViewProvider',(req,res)=>{
    return ManageProvider.ViewProvider(req,res);
})

module.exports=router;