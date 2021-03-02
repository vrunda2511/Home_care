const express=require('express');
const router=express.Router();
const {isSignedIn}=require('../../Customer/controller/user')

var ordermanagement=require('../controller/order')

router.get('/ViewOrderData',isSignedIn,(req,res)=>{
    return ordermanagement.ViewOrderData(req,res);
})

router.put('/UpdateOrderData',isSignedIn,(req,res)=>{
    return ordermanagement.UpdateOrderData(req,res);
})

router.get('/HistoryOrderData',isSignedIn,(req,res)=>{
    return ordermanagement.HistoryOrderData(req,res);
})
module.exports=router;