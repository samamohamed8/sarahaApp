import joi from "joi";
import { Types } from "mongoose";

export const customId = (value,helper) =>{
    let data = Types.ObjectId.isValid(value)
   return data ? value  : helper.message("id is not valid")
}

export const generalRules ={
    ObjectId : joi.string().custom(customId),
    headers:joi.object({
         authorization: joi.string().required(),
         host:joi.string(),
         'cache-control':joi.string(),
         'postman-token':joi.string(),
         'content-type':joi.string(),
         'content-length':joi.string(),
         'user-agent':joi.string(),
         accept:joi.string(),
         'accept-encoding':joi.string(),
         connection:joi.string(),
    }),
 email: joi.string().email({tlds: {allow:true}}),//{allow:["com","org"]} only this two are allowed
 password: joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),

}