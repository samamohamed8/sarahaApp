import messageModel from "../../db/models/message.model.js";
import userModel from "../../db/models/user.model.js";
import { asyncHandler } from "../../utils/error/errorHandler.js";

export const sendMessage = asyncHandler(async (req, res, next) => {
  const { userId, content } = req.body;
  if (!(await userModel.findOne({ _id: userId, isDeleted: false }))) {
    return next(new Error("user does not exists"));
  }
  const message = await messageModel.create({ userId, content });
  return res.status(201).json({ msg: "done", message });
});


export const getMessage = asyncHandler(async (req, res, next) => {
 
  const messages = await messageModel.find({ userId: req.user._id });
  return res.status(201).json({ msg: "done", messages });
});
