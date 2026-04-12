import api from "./axios";

interface loginData{
    email: String,
    password:String
}



export const LoginUser = async (data:loginData)=>{
    
    const res = await api.post("/auth/login", data)
    return res.data
}

export const RegisterUser = async(data:loginData)=>{
    const res = await api.post("/auth/register", data)
    return res.data
}