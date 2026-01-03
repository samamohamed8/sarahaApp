import CryptoJS from "crypto-js";

//  key ref to phone
export const Encrypt = async({key , SECRET_KEY =process.env.SECRET_KEY})=>{
    return CryptoJS.AES.encrypt(key ,SECRET_KEY).toString();
}