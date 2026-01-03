import userModel from "../../db/models/user.model.js";
import { asyncHandler } from "../../utils/error/errorHandler.js";
import { eventEmitter } from "../../utils/sendEmail/sendEmail.event.js";
import { HashAsync, CompareAsync } from "../../utils/hash/index.js";
import { Encrypt, Decrypt } from "../../utils/encrypt/index.js";
import { GenerateToken, Verify } from "../../utils/token/index.js";
import messageModel from "../../db/models/message.model.js";

/* ===================== SIGN UP ===================== */
export const signup = asyncHandler(async (req, res, next) => {
  const { name, email, password, confirmPassword, gender, phone } = req.body;

  // if (password !== confirmPassword) {
  //   return next(new Error("password do not match", { cause: 400 }));
  // }

  const emailExist = await userModel.findOne({ email });
  if (emailExist) {
    return next(new Error("email already exists"));
  }

  const hash = await HashAsync({ password, SALT_ROUNDS: process.env.SALT_ROUNDS });

  const cryptoPhone = await Encrypt({
    key: phone,
    SECRET_KEY: process.env.SECRET_KEY,
  });

  eventEmitter.emit("sendEmail", { email });

  const user = await userModel.create({
    name,
    email,
    password: hash,
    gender,
    phone: cryptoPhone,
    confirmed: false,
  });

  res.status(201).json({ msg: "signup success, check your email", user });
});

/* ===================== CONFIRM EMAIL ===================== */
export const confirmEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  if (!token) {
    return next(new Error("token not found"));
  }

  const decoded = Verify({
    token: token,
    SIGNATURE: process.env.SIGNATURE_CONFIRMATION,
  });

  if (!decoded?.email) {
    return next(new Error("invalid token payload", { cause: 400 }));
  }

  const user = await userModel.findOneAndUpdate(
    { email: decoded.email, confirmed: false },
    { confirmed: true },
    { new: true }
  );

  if (!user) {
    return next(new Error("user not found or already confirmed"));
  }

  res.status(200).json({ msg: "email confirmed successfully" });
});

/* ===================== SIGN IN ===================== */
export const signin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email, confirmed: true }).select("+password");
  if (!user) return next(new Error("invalid email or email not confirmed", { cause: 400 }));
 
  const match = await CompareAsync({ key:password, hashed: user.password });
  if (!match) {
    return next(new Error("invalid password", { cause: 400 }));
  }

  const token = GenerateToken({
    payload: { email: user.email, id: user._id },
    SIGNATURE:
      user.role === "admin"
        ? process.env.SIGNATURE_KEY_ADMIN
        : process.env.SIGNATURE_KEY_USER,
  });

  res.status(200).json({ msg: "login success", token });
});

/* ===================== GET PROFILE ===================== */
export const getProfile = asyncHandler(async (req, res) => {
  const phone = await Decrypt({
    key: req.user.phone,
    SECRET_KEY: process.env.SECRET_KEY,
  });
   const messages = await messageModel.find({ userId: req.user._id });
  res.status(200).json({
    msg: "done",
    user: req.user,
  });
});

/* ===================== SHARE PROFILE ===================== */
export const shareProfile = asyncHandler(async (req, res) => {
  
  const user = await userModel.findById(req.params.id).select("name email phone")

  user ? res.status(200).json({ msg: "done",user}): res.status(401).json({ msg: "user not found"})
});
//================================update profile=======================================

export const updateProfile = asyncHandler(async (req, res) => {
  if(req.body.phone){

    req.body.phone =  await Encrypt({
    key: req.body.phone,
    SECRET_KEY: process.env.SECRET_KEY,
    
  });
  }
   const user = await userModel.findByIdAndUpdate(req.user._id , req.body , {new: true})
  res.status(200).json({
    msg: "done",
    user
  });
});

//================================update password=======================================

export const updatePassword = asyncHandler(async (req, res,next) => {

 const {oldPassword , newPassword} = req.body
const checkPassword = await CompareAsync({key: oldPassword , hashed: req.user.password})
if(!checkPassword){
   return next(
      new Error("invalid old password", { cause: 401 })
    );
  
}
const hash =await HashAsync ({key: newPassword , SALT_ROUNDS:process.env.SALT_ROUNDS})

   const user = await userModel.findByIdAndUpdate(req.user._id ,{password: hash , passwordChangedAt:Date.now()}, {new: true})
  res.status(200).json({
    msg: "done",
    user
  });
});


//================================soft delete (freeze)=======================================

export const freezeAccount = asyncHandler(async (req, res,next) => {

 

   const user = await userModel.findByIdAndUpdate(req.user._id ,{isDeleted: true  , passwordChangedAt:Date.now()}, {new: true})
  res.status(200).json({
    msg: "done",
    user
  });
});

