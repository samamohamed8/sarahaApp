import joi from "joi";
import { generalRules } from "../../utils/generalData/generalData.js";


export const sendMessageSchema ={
    body:joi.object({
        content: joi.string().min(10).max(1000).required(),
        userId: generalRules.ObjectId.required()
    })
}