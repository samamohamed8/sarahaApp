import jwt from "jsonwebtoken";


export const Verify =  ({token , SIGNATURE })=>{
  return  jwt.verify(token , SIGNATURE  )
}