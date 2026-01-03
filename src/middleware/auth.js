import jwt from "jsonwebtoken";
import userModel from "../db/models/user.model.js";
import { asyncHandler } from "../utils/error/errorHandler.js";

export const roles = {
  user: "user",
  admin: "admin",
};

export const authentication = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;

  
  const [prefix, token] = authorization.split(" ") || [];

  if (!token || !prefix) {
    return next(new Error("authorized token is required", { cause: 401 }));
  }

  let SIGNATURE = undefined;
  if (prefix == "admin") {
    SIGNATURE = process.env.SIGNATURE_KEY_ADMIN;
  } else if (prefix == "Bearer") {
    SIGNATURE = process.env.SIGNATURE_KEY_USER;
  } else {
    return next(
      new Error("invalid authorization token prefix", { cause: 401 })
    );
  }

  const decoded = jwt.verify(token, SIGNATURE);

  if (!decoded?.id) {
    return next(new Error("invalid token payload", { cause: 403 }));
  }

  const user = await userModel.findById(decoded.id);
  if (!user) {
    return next(new Error("user not found", { cause: 404 }));
  }

if (user.passwordChangedAt) {
  const changedAt = Math.floor(user.passwordChangedAt.getTime() / 1000);

  if (changedAt > decoded.iat) {
    return next(
      new Error("token expired, please login again", { cause: 401 })
    );
  }
}
if(user?.isDeleted){
  return next(
      new Error("user deleted", { cause: 401 })
    );
}
  req.user = user;
  
  next();
});

export const authorization = (accessRoles = []) => {
  return asyncHandler(async (req, res, next) => {
    if (!accessRoles.includes(req?.user?.role)) {
      return next(new Error("Access denied", { cause: 403 }));
    }

    next();
  });
};
