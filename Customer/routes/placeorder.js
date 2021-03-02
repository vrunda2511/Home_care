const express=require('express');
const router=express.Router();
const {isSignedIn}=require('../../Customer/controller/user')

var order=require('../controller/placeorder')

router.post('/PlaceOrder',isSignedIn,(req,res)=>{
    return order.PlaceOrder(req,res);
})

router.get('/ViewOrder/:id',isSignedIn,(req,res)=>{
    return order.ViewOrder(req,res);
})


module.exports=router;