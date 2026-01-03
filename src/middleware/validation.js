import { asyncHandler } from "../utils/error/errorHandler.js";

export const validation = (schema) => {
  return asyncHandler((req, res, next) => {
    let validationResult = [];
    for (const key of Object.keys(schema)) {
      const validatorError = schema[key].validate(req[key], {
        abortEarly: false,
      });
      // if you have inside you error ?.
      if (validatorError?.error) {
        validationResult.push(validatorError.error.details);
      }
      if (validatorError.length > 0) {
        return res.json({ msg: "validation failed", error: validationResult });
      }
    }

    next();
  });
};
