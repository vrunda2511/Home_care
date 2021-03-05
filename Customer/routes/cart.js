const express=require('express');
const router=express.Router();
const {isSignedIn}=require('../../Customer/controller/user')
var cart=require('../controller/cart')

router.post('/AddToCart',isSignedIn,(req,res)=>{
    return cart.AddToCart(req,res);
})

router.delete('/RemoveFromCart/:id',isSignedIn,(req,res)=>{
    return cart.RemoveFromCart(req,res);
})

router.get('/ViewFromCart/:id',(req,res)=>{
    return cart.ViewFromCart(req,res);
})
module.exports=router;