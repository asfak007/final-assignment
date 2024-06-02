const jwt = require('jsonwebtoken');

exports.EncodeToken=(email,user_id)=>{
    let Key="123-ABC-XYZ";
    let EXPIRE={expiresIn:'24h'};
    let PAYLOAD = {email:email, user_id:user_id}

    return jwt.sign(PAYLOAD,Key,EXPIRE)

}

exports.DecodeToken=(token)=>{
    try{
        let Key="123-ABC-XYZ"
        return jwt.verify(token,Key)
    }catch(e){
        return null;
    }
}