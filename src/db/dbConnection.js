import mongoose from "mongoose";

const connectionDb = async()=>{
 await mongoose.connect(process.env.MONGO_ONLINE)
  .then(()=>{
    console.log("database connected")
  })
  .catch((error)=>{
    console.log("database failed to connect",error)
  })
}

export default connectionDb