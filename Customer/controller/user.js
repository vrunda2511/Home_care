const client=require("../../Connection/connection");
var jwt=require('jsonwebtoken')
var expressJwt=require('express-jwt')


exports.Signup=function(req,res){
    (async()=>{
        const getuserdata=req.body;
        const adduser=await client.query('insert into customer(firstname,lastname,gender,mobile_no,email,password,address,image,area) values($1,$2,$3,$4,$5,$6,$7,$8,$9)',[getuserdata.firstname,getuserdata.lastname,getuserdata.gender,getuserdata.mobile_no,getuserdata.email,getuserdata.password,getuserdata.address,getuserdata.image,getuserdata.area],(error)=>{
            if(error)
            {
                res.status(401).json(error);
            }
            res.status(200).json({
                status:"Success",
                msg:"User added Succesfully"
            })
        })
    })();
}

exports.SignIn=function(req,res){
    (async()=>{
        const {email,password}=req.body;
        const checkemail=await client.query('select email,customer_id from customer where email=$1',[email],(error,result)=>{
            if(error){
                res.status(401).json(error);
            }
            if(result.rowCount<=0){
                res.status(401).json({
                    status:'Fail',
                    msg:'Email is not exits'
                })
            }
            else
            {
                (async()=>{
                    const login=await client.query('select email,customer_id,firstname,lastname,role from customer where email=$1 and password=$2',[email,password],(error,logincreadancial)=>{
                        if(error){
                            res.status(401).json(error);
                        }
                        if(logincreadancial.rowCount<=0){
                            res.status(401).json({
                                status:'Fail',
                                msg:'Password incorrect please try again'
                            })
                        }else{
                            // res.status(200).json({
                            //     status:'Succesfull',
                            //     msg:logincreadancial.rows
                            // })

                            //craete token
                            const token=jwt.sign({_id:logincreadancial.rows[0]['customer_id']},"vrundasavaliya")
                            //put token in cookie
                            res.cookie('token',token,{expire:new Date()+9999})
                            //send responce to frontend
                            res.status(200).json({
                                status:"Success",
                                msg:logincreadancial.rows,
                                token:token
            
                            })
                        }
                      
                       
                    })
                })();
            }
           //check login credancial
          
        })
    })();
}

exports.Signout=function(req,res){
    res.clearCookie("token")
    res.json({
        msg:"User Signout Successfully"
    });
};

exports.UpdateCustomer=function(req,res){
    (async()=>{
        const updatedata=req.body;
        const customer_id=req.params.id;
        let dateobj=new Date();
        console.log(updatedata);
        const updatecustomer=await client.query("update customer set firstname=$1,lastname=$2,mobile_no=$3,email=$4,password=$5,address=$6,image=$7,area=$8,modified_date=$9 where customer_id=$10",[updatedata.firstname,updatedata.lastname,updatedata.mobile_no,updatedata.email,updatedata.password,updatedata.address,updatedata.image,updatedata.area,dateobj.getDate()+'-'+(dateobj.getMonth()+1)+'-'+dateobj.getFullYear(),customer_id],(error,responce)=>{
            if(error){
                 res.status(401).json(error);
            }
            res.status(200).json({
                msg:"Updated succesfully"
            })
        })
    })();
}

exports.ViewCustomer=function(req,res){
    (async()=>{
        const customer_id=req.params.id;
        const viewcustomer=await client.query("select firstname,lastname,gender,mobile_no,email,address,image,area from customer where customer_id=$1",[customer_id],(error,responce)=>{
            if(error){
                 res.status(401).json(error);
            }
            res.status(200).json({
                msg:responce.rows
            })
        })
    })();
}

//protected routes
exports.isSignedIn=expressJwt({
    secret: "vrundasavaliya",
    userProperty: "auth",
    algorithms: ['HS256']
});