import api from "./axios";

interface categoryData{
    name: string,
    slug: string,
}

export const statistics = async()=>{
    const res = await api.get("/admin/getStat")
    return res.data
}

export const AddCategory = async (data:categoryData)=>{
    const res = await api.post("/admin/addCategory",data)
    return res.data
}

export const getCategory = async()=>{
    const res = await api.get('/admin/getCategory')
    return res.data
}

export const getCourse = async()=>{
    const res = await api.get('/admin/getCourse')
    return res.data
}

export const addCourse = async(data:any)=>{
    const res = await api.post("/admin/addCourse",data)
    return res.data
}

export const activateCourse = async(id:string)=>{
    const res = await api.put(`/admin/publishCourse/${id}`)
    return res.data
}

export const delCourse = async(id:string)=>{
    const res = await api.delete(`/admin/deleteCourse/${id}`)
    return res.data
}

export const getPendingCourse = async ()=>{
    const res = await api.get("/admin/pendingCourses")
    return res.data
}

export const getArchivedCourse = async()=>{
    const res = await api.get("/admin/archivedCourses")
    return res.data
}

export const updateCourse=async(id:string, data:any)=>{
    const res = await api.put(`/admin/updateCourse/${id}`,data)
    return res.data
}

export const getMessages = async()=>{
    const res = await api.get("/admin/contacts")
    return res.data
}
