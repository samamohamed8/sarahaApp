import { Router } from "express";
import { confirmEmail, freezeAccount, getProfile, shareProfile, signin, signup, updatePassword, updateProfile } from "./user.service.js";
import {  authentication, authorization, roles } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import { shareProfileSchema, signInSchema, signUpSchema, updatePasswordSchema, updateProfileSchema } from "./user.validation.js";

const userRouter = Router()

userRouter.post("/signup",validation(signUpSchema),signup)
userRouter.post("/signin",validation(signInSchema),signin)
userRouter.get("/confirmEmail/:token",confirmEmail)
userRouter.get("/profile", authentication,authorization(Object.values(roles)),getProfile)
userRouter.get("/shareProfile/:id",validation(shareProfileSchema),shareProfile)
//authorization(roles.user) instead of that authorization(Object.values(roles)) if i want user only
userRouter.patch("/profile/update",validation(updateProfileSchema), authentication,updateProfile)
userRouter.patch("/profile/update/password",validation(updatePasswordSchema), authentication,updatePassword)
userRouter.delete("/freezeAccount",validation(freezeAccount), authentication,freezeAccount)

export default userRouter