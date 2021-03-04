const client=require("../../Connection/connection");

exports.ViewOrderData=function(req,res){
    (async()=>{
        const vieworder=await client.query('select p.customer_id ,s.sub_servicename ,s.price,s.time_duration ,p.area ,p.address ,c.firstname as customer_firstname,c.lastname as customer_lastname ,c.mobile_no as customer_mobileno ,p2.firstname as provider_firstname,p2.lastname as provider_lastname,p2.mobile_no as provider_mobileno,p.order_date ,p.order_status from placeorder p,customer c,provider p2,subservices s where c.customer_id =p.customer_id and s.subservice_id =p.subservice_id and order_status=$1',['pending'],(error,response)=>{
            if(error){
                res.status(401).json(error);
            }
            res.status(200).json({
                status:"Success",
                data:response.rows
            })
        })
    })();
}

exports.UpdateOrderData=function(req,res){
    (async()=>{
        const orderupdatedata=req.body;
        const updateorder=await client.query('update placeorder set order_status=$1 where customer_id=$2',[orderupdatedata.orderstatus,orderupdatedata.customer_id],(error,response)=>{
            if(error){
                res.status(401).json(error);
            }
            res.status(200).json({
                status:"Success",
               msg:"Updated order Successfully"
            })
        })
    })();
}

exports.HistoryOrderData=function(req,res){
    (async()=>{
        const historyorder=await client.query('select p.customer_id ,s.sub_servicename ,s.price,s.time_duration ,p.area ,p.address ,c.firstname as customer_firstname,c.lastname as customer_lastname ,c.mobile_no as customer_mobileno ,p2.firstname as provider_firstname,p2.lastname as provider_lastname,p2.mobile_no as provider_mobileno,p.order_date ,p.order_status from placeorder p,customer c,provider p2,subservices s where c.customer_id =p.customer_id and s.subservice_id =p.subservice_id and order_status!=$1',['pending'],(error,response)=>{
            if(error){
                res.status(401).json(error);
            }
            res.status(200).json({
                status:"Success",
                data:response.rows
            })
        })
    })();
}