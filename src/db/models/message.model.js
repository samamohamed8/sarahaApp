import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({

    content:{
        type:String,
        required: true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
},{
    timestamps:true,
})

const messageModel = mongoose.model("message", messageSchema) || mongoose.models.Message

export default messageModel