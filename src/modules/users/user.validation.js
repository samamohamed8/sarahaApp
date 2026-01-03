import joi from "joi";
import { generalRules } from "../../utils/generalData/generalData.js";
import { enumGender } from "../../db/models/user.model.js";


// joi schema
export const signUpSchema = {
  body: joi.object({
    name: joi.string().alphanum().min(3).max(20).messages({
        "string.min":"name is too short",
         "string.max":"name is too long",
    }).required(),
    email: generalRules.email.required(),
    password: generalRules.password.required(),
    confirmPassword: joi.valid(joi.ref("password")).required(),
    gender: joi.string().valid(enumGender.female,enumGender.male).required(),
    phone: joi.string().regex(/^01[0125][0-9]{8}$/).required(),
      // car: joi.array().items(joi.object({
      //   model: joi.number().min(2000).max(2025).integer().positive().required(),
      //   color:joi.string().required()
      // })).required(),
      //id:joi.string().custom(customId).required()
      //id: generalRules.ObjectId.required()
  }),//.options({presence:"required"})
  //headers: generalRules.headers.required()
};


// joi schema
export const signInSchema = {
  body: joi.object({
   
    email: generalRules.email.required(),
    password: generalRules.password.required(),
  })
};
export const shareProfileSchema = {
  body: joi.object({
   
    id:generalRules.ObjectId.required(),
  })
};

export const updateProfileSchema = {
  body: joi.object({
     name: joi.string().alphanum().min(3).max(20).messages({
        "string.min":"name is too short",
         "string.max":"name is too long",
    }),
    email: generalRules.email.required(),
  
    gender: joi.string().valid(enumGender.female,enumGender.male),
    phone: joi.string().regex(/^01[0125][0-9]{8}$/),
    
  }).required(),
  headers: generalRules.headers.required()
};

export const updatePasswordSchema = {
  body: joi.object({
    oldPassword: generalRules.password.required(),
    newPassword: generalRules.password.required(),
    cPassword:generalRules.password.valid(joi.ref('newPassword')).required()
  }).required(),
  headers: generalRules.headers.required()
};

export const freezeAccountSchema = {
  
  headers: generalRules.headers.required()
};
