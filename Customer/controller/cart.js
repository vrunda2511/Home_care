const client=require("../../Connection/connection");

exports.AddToCart=function(req,res){
    (async()=>{
        const cartdata=req.body;
        const addtocart=await client.query("insert into cart(subservice_id,customer_id) values($1,$2)",[cartdata.subservice_id,cartdata.customer_id],(error)=>{

            if(error){
                res.status(401).json(error);
            }
            res.status(200).json({
                status:'Success',
                msg:"Service Added into cart"
            })
        })
    })();

}

exports.RemoveFromCart=function(req,res){
    (async()=>{
        const cart_id=req.params.id;
        const removefromcart=await client.query("delete from cart where cart_id=$1",[cart_id],(error)=>{

            if(error){
                res.status(401).json(error);
            }
            res.status(200).json({
                status:'Success',
                msg:"Service removed from cart"
            })
        })
    })();

}