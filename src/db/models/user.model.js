
import mongoose from "mongoose";
import { roles } from "../../middleware/auth.js";


export const enumGender ={
  male :'male',
  female:'female'
}
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true , "name is required"],
  },
  email: {
    type: String,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    maxLength: 220,
  },
  gender: {
    type: String,
    required: true,
    enum: Object.values(enumGender),
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  role:{
        type: String,
        default:roles.user,
    required: true,
    enum: Object.values(roles),
  },
  passwordChangedAt: {
  type: Date
}, isDeleted:{
    type: Boolean,
    default: false,
}
},{
    timestamps: true
});

const userModel = mongoose.models.User || mongoose.model("user",userSchema)
export default userModel