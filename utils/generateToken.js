import jwt from "jsonwebtoken";
import 'dotenv/config';


const secretkey = process.env.secretKey;


export const userToken = (user)=>{
    return jwt.sign({data:user.email,role:user.role},secretkey,{expiresIn:'1d'});
}

// export const adminToken = (user)=>{
//     return jwt.sign({data:user._id,role:user.role},secretkey,{expiresIn:'1d'})
// }