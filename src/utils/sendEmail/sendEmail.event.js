import { EventEmitter } from "events";

import { sendEmail } from "../../services/sendEmail.js";
import { GenerateToken } from "../token/generateToken.js";

export const eventEmitter = new EventEmitter();

eventEmitter.on("sendEmail", async (data) => {
  const { email } = data;

  const token = await GenerateToken({
    payload: { email },
    SIGNATURE: process.env.SIGNATURE_CONFIRMATION,
    options: { expiresIn: "10min" },
  });

  const link = `http://localhost:3003/user/confirmEmail/${token}`;

  //  // const emailSender =

  await sendEmail(
    email,
    "Confirm Email",
    `<a href="${link}">Confirm Email</a>`
  );

});
