const client=require("../../Connection/connection");

exports.PlaceOrder=function(req,res){
    (async()=>{
        const orderdata=req.body;
        const placeorder=await client.query('insert into Placeorder(customer_id,subservice_id,address,area,amount) values($1,$2,$3,$4,$5)',[orderdata.customer_id,orderdata.subservice_id,orderdata.address,orderdata.area,orderdata.amount],(error)=>{
            if(error){
                return res.status(401).json(error);
            }
            res.status(200).json({
                status:"success",
                msg:"Order Placed Succesfully you will get conformation soon"
            })
        })
    })();
}

exports.ViewOrder=function(req,res){
    (async()=>{
        const customer_id=req.params.id;        
        const placeorder=await client.query('select placeorder_id,sub_servicename,s.subservice_id,price,time_duration,order_date,order_status from placeorder p left join subservices s on s.subservice_id =p.subservice_id where customer_id=$1',[customer_id],(error,response)=>{
            if(error){
                return res.status(401).json(error);
            }
            res.status(200).json(response.rows
            )
        })
    })();
}


