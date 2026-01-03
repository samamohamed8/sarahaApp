
import jwt from "jsonwebtoken";

export const GenerateToken =({payload ={} , SIGNATURE , options})=>{
    return jwt.sign(
        payload,
       SIGNATURE,
    options);
    
}