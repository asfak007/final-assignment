const { DecodeToken } = require("../utility/TokenHelper");

module.exports=(req,res,next)=>{

    let token = req.headers['token'];
    if(!token){
        token=req.cookies['token'];
    }
    
    

    let decoder = DecodeToken(token);



    if(decoder===null){
        return res.status(401).json({status:"fail",message:"Unauthorized"})
    }else{
        let email = decoder['email'];
        let user_id = decoder['user_id'];

        req.headers.email=email;
        req.headers.user_id= user_id;
        next();
    }
}