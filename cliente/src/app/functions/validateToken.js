//import { jwtVerify } from "jose";
import { decode } from "jsonwebtoken";

const validateToken = async (token) => {
   
try{
    const isTokenValidate = await decode(token)
    if(isTokenValidate){
        return true
    }
    } catch {
        return false
    }
    }
export {validateToken};