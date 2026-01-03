import connectionDb from "./db/dbConnection.js";
import userRouter from "./modules/users/user.controller.js";
import dotenv from "dotenv";
import path from "path"
dotenv.config({path: path.resolve("config/.env")})
import { globelErrorHandler } from "./utils/error/errorHandler.js";
import messageRouter from "./modules/messages/message.controller.js";
import cors from "cors"
dotenv.config();

const bootstrap = (app, express) => {

  app.use(cors())
  app.use(express.json());
 
  connectionDb();
app.get('/', (req, res,next) =>{ res.status(200).json({msg:'Hello from app saraha'})})
  app.use("/user", userRouter);
   app.use("/message", messageRouter);

  app.use(globelErrorHandler);
};
export default bootstrap;
