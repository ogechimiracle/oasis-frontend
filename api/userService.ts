import api from "./axios";


export const getCourseById = async(id:string)=>{
    const res = await api.get(`/users/courseById/${id}`)
    return res.data
}

export const getAllCourses = async()=>{
    const res = await api.get("/users/activeCourses")
    return res.data
}

export const sendMessage = async(data:any)=>{
    const res = await api.post("/users/contact",data)
    return res.data
}