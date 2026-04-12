'use client'

import {FaPlus} from "react-icons/fa"
import {Table,TableBody,TableCaption,TableCell,TableFooter,TableHead,TableHeader,TableRow,} from "@/components/ui/table"
import { useState, useEffect } from "react"
import Modal from "@/components/ui/modal"
import { useForm } from "@/lib/useForm"
import { activateCourse, addCourse, delCourse, getCategory, getCourse } from "@/api/adminService"
import Image from "next/image"
import { courseValidation } from "@/validation/course.schema"
import { convertToArray, formatCustomDateTime } from "@/lib/utils"
import toast from "react-hot-toast"
import Spinner from "@/components/ui/spinner"
import { set } from "zod"




function Courses(){

    const [course, setCourse] = useState<any>([])
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [refresh, setRefresh] = useState<boolean>(false)
    const [category, setCategory] = useState<any>([])
    const [imagePreview, setImagePreview] =  useState<string | null>(null)
    const [error, setError] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    

    const courseForm = useForm({
        category: "",
        title: "",
        slug: "",
        briefDefinition: "",
        prerequisite: "",
        keyAreas: "",
        outcomes: "",
        jobRoles: "",
        industries: "",
        duration: "",
        cost: "",
        paid: false,
        thumbnail: null as File | null,
        level: "beginner",
    },{
        booleanFields: ["paid"],
    })


    useEffect(()=>{

        const getCourseCategory = async ()=>{
            try {
                const cat = await getCategory()
                if(cat.success){
                    setCategory(cat.data)
                }
            } catch (error:any) {
                console.log(error)
            }
        };

        const getCourses = async ()=>{
            try {
                const data = await getCourse()
                if(data.success){
                    setCourse(data.data)
                }
            } catch (error:any) {
                console.log(error)
            }
        };

        getCourseCategory()
        getCourses()

    },[refresh])

    useEffect(()=>{
         if (!courseForm.formData.thumbnail) return;

        const objectUrl = URL.createObjectURL(courseForm.formData.thumbnail);
        setImagePreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [courseForm.formData.thumbnail])


    const hanleActivateCourse = async(id:string)=>{
        try {
            setLoading(true)
            const result = await activateCourse(id)
            if(result.success){
                toast.success(result.message)
                setRefresh(prev => !prev)
            }
        } catch (error:any) {
            toast.error(error.response?.data?.message || "An error occurred while activating the course")
            setLoading(false)
        }
        finally{
            setLoading(false)
        }
    }


    const handleDeleteCourse = async(id:string)=>{
        try {
            setLoading(true)    
            const result = await delCourse(id)
            if(result.success){
                toast.success(result.message)
                setRefresh(prev => !prev)
            }
        } catch (error:any) {
            toast.error(error.response?.data?.message || "An error occurred while deleting the course")
            setLoading(false)
        }
        finally{
            setLoading(false)
        }
    }



    const handleSubmitCourse= async(e:React.FormEvent)=>{
        e.preventDefault()
        const result = courseValidation.safeParse(courseForm.formData)
        if (!result.success) {
            const formattedErrors: any = {};
            result.error.issues.forEach((err) => {
            formattedErrors[err.path[0]] = err.message;
            });

            setError(formattedErrors);
            return;
        }

        try {
            setLoading(true)
           const formData = new FormData();

            const { thumbnail, ...dataWithoutThumbnail } = courseForm.formData;

            const parsedData = {
                ...dataWithoutThumbnail,
                keyAreas: convertToArray(courseForm.formData.keyAreas),
                outcomes: convertToArray(courseForm.formData.outcomes),
                jobRoles: convertToArray(courseForm.formData.jobRoles),
                industries: convertToArray(courseForm.formData.industries),
                cost: courseForm.formData.cost ? Number(courseForm.formData.cost) : undefined,
            };

            formData.append("data", JSON.stringify(parsedData));

            if (thumbnail) {
                formData.append("thumbnail", thumbnail);
            }

            const result = await addCourse(formData)

            if(result.success){
                toast.success(result.message)
                setOpenModal(false)
                setCourse(result.data)
                courseForm.resetForm()
                setRefresh(!refresh)
            }
            
        } catch (error:any) {
            setLoading(false)
            console.log(error.message)
            toast.error("An error occurred while adding the course")
        }finally{
            setLoading(false)
        }

    }

    return(
        <div>
            
            <div className="flex items-center justify-between">
                <div className="text-xl font-bold ">Create New Course</div>
                <div>
                    <button onClick={()=>setOpenModal(!openModal)} className="flex items-center gap-x-5 rounded-full cursor-pointer border border-black px-4 py-3 hover:bg-black hover:text-white transition-all ease-in duration-150 ">
                        <FaPlus size={15} />
                        <span>Create Course</span>
                    </button>
                </div>
            </div>

            <div className="mt-10">
                <p className="text-lg font-semibold">All Course</p>

                <div className="mt-5 bg-white rounded-xl shadow-sm p-1">
                    <Table>
                        <TableCaption>All Courses</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Date Created</TableHead>
                                <TableHead>Course Level</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                           
                            <TableBody>

                                {
                                   course.length > 0 ? 
                                    course.map((item:any, index:any)=>(
                                        <TableRow key={index}>
                                            <TableCell>{item.title}</TableCell>
                                            <TableCell>{item.cost}</TableCell>
                                            <TableCell>{formatCustomDateTime(item.createdAt)}</TableCell>
                                            <TableCell>{item.level}</TableCell>
                                            <TableCell className="space-x-3">
                                                <button className="rounded-lg bg-red-500 text-white text-xs px-4 py-2" onClick={()=>handleDeleteCourse(item.id)}>Delete</button>
                                                <button className="bg-mygreenColor px-4 py-2 rounded-lg text-xs text-white">Edit</button>
                                                {item.status ==="published" ? (
                                                    <span className="px-2 py-1.5 rounded-full bg-myprimaryColor text-black text-xs">Published</span>
                                                ): (
                                                    <button className="px-4 py-2 rounded-lg text-xs border-2 border-myheroColor capitalize" onClick={()=>hanleActivateCourse(item.id)}>
                                                   {loading ? (<div>
                                                    <Spinner/>
                                                   </div>):(
                                                     <span>{item.status === "draft" ? "activate" : "archive"}</span>
                                                   )}
                                                </button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                        ))
                                   :
                                   (
                                    <TableRow className="">
                                        <TableCell className="py-5 font-semibold text-red-800">No Date created</TableCell>
                                    </TableRow>
                                   )
                                }

                            </TableBody>
                        
                    </Table>
                </div>
            </div>


            <Modal title="Add Caourse" isOpen={openModal} onClose={()=>setOpenModal(!openModal)} widthClass="w-full max-w-4xl">
                <div>
                    <form onSubmit={handleSubmitCourse} encType="multipart/form-data" className="space-y-4 relative">

                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-3 ">
                           <div className="">
                                <label htmlFor="" className="uppercase font-semibold text-md">title</label>
                                <input type="text" name="title" className="w-full outline-1 border-black rounded-xl px-5 py-2.5 text-black placeholder-gray-400" placeholder="Course Title" value={courseForm.formData.title} onChange={courseForm.handleChange} />
                                 {error.title && (<small className="text-xs text-red-400 font-semibold">{error.title}</small>)}
                            </div>

                            <div>
                                <label htmlFor="" className="uppercase font-semibold text-md">Course Category</label>
                                <select name="category" value={courseForm.formData.category} onChange={courseForm.handleChange} id=""  className="w-full outline-1 border-black rounded-xl px-5 py-2.5 text-black placeholder-gray-400">
                                    {category.map((item:any,index:any)=>(
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                                 {error.category && (<small className="text-xs text-red-400 font-semibold">{error.category}</small>)}
                            </div>
                     </div>

                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-3 w-full ">
                        <div className="">
                            <label htmlFor="" className="uppercase font-semibold text-md">Slug (Optional) </label>
                            <input type="text" name="slug" value={courseForm.formData.slug} onChange={courseForm.handleChange}  className="w-full outline-1 border-black rounded-xl px-5 py-2.5 text-black placeholder-gray-400" placeholder="Slug" />
                             {error.slug && (<small className="text-xs text-red-400 font-semibold">{error.slug}</small>)}
                        </div>

                         <div className="">
                            <label htmlFor="" className="uppercase font-semibold text-md">Pre-requesite </label>
                            <input type="text" name="prerequisite" value={courseForm.formData.prerequisite} onChange={courseForm.handleChange}  className="w-full outline-1 border-black rounded-xl px-5 py-2.5 text-black placeholder-gray-400" placeholder="basic computing, word, etc" />
                             {error.prerequisite && (<small className="text-xs text-red-400 font-semibold">{error.prerequisite}</small>)}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-3 w-full ">

                        <div className="col-span-2">
                            <label htmlFor="" className="uppercase font-semibold text-md">Project Description </label>
                            <textarea name="briefDefinition" id="" value={courseForm.formData.briefDefinition} onChange={courseForm.handleChange}  className="w-full outline-1 border-black rounded-xl px-5 py-2.5 text-black placeholder-gray-400"></textarea>
                             {error.briefDefinition && (<small className="text-xs text-red-400 font-semibold">{error.briefDefinition}</small>)}
                        </div>

                        <div>
                            <label htmlFor="" className="uppercase font-semibold text-md">Key Areas (comma seperated) </label>
                            <input type="text" name="keyAreas" value={courseForm.formData.keyAreas} onChange={courseForm.handleChange}  className="w-full outline-1 border-black rounded-xl px-5 py-2.5 text-black placeholder-gray-400" placeholder="course key areas" />
                             {error.keyAreas && (<small className="text-xs text-red-400 font-semibold">{error.keyAreas}</small>)}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-3 w-full ">
                        <div>
                            <label htmlFor="" className="uppercase font-semibold text-md">Outcome (comma seperated) </label>
                            <input type="text" name="outcomes" value={courseForm.formData.outcomes} onChange={courseForm.handleChange}  className="w-full outline-1 border-black rounded-xl px-5 py-2.5 text-black placeholder-gray-400" placeholder="course outcomes" />
                             {error.outcomes && (<small className="text-xs text-red-400 font-semibold">{error.outcomes}</small>)}
                        </div>

                        <div>
                            <label htmlFor="" className="uppercase font-semibold text-md">Job Roles (comma seperated) </label>
                            <input type="text" value={courseForm.formData.jobRoles} name="jobRoles" onChange={courseForm.handleChange}  className="w-full outline-1 border-black rounded-xl px-5 py-2.5 text-black placeholder-gray-400" placeholder="job roles" />
                             {error.jobRoles && (<small className="text-xs text-red-400 font-semibold">{error.jobRoles}</small>)}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-3 w-full ">
                        <div>
                            <label htmlFor="" className="uppercase font-semibold text-md">Industries (comma seperated) </label>
                            <input type="text" value={courseForm.formData.industries} name="industries" onChange={courseForm.handleChange} className="w-full outline-1 border-black rounded-xl px-5 py-2.5 text-black placeholder-gray-400" placeholder="course applicable industries" />
                             {error.industries && (<small className="text-xs text-red-400 font-semibold">{error.industries}</small>)}
                        </div>
                        
                        <div>
                            <label htmlFor="" className="uppercase font-semibold text-md">duration (optional) </label>
                            <input type="text" name="duration" value={courseForm.formData.duration} onChange={courseForm.handleChange}  className="w-full outline-1 border-black rounded-xl px-5 py-2.5 text-black placeholder-gray-400" placeholder="5 months" />
                             {error.duration && (<small className="text-xs text-red-400 font-semibold">{error.duration}</small>)}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-3 w-full ">
                         <div>
                            <label htmlFor="" className="uppercase font-semibold text-md">cost (optional) </label>
                            <input type="text" name="cost" value={courseForm.formData.cost} onChange={courseForm.handleChange}  className="w-full outline-1 border-black rounded-xl px-5 py-2.5 text-black placeholder-gray-400" placeholder="amount" />
                             {error.cost && (<small className="text-xs text-red-400 font-semibold">{error.cost}</small>)}
                        </div>

                         <div>
                            <label htmlFor="" className="uppercase font-semibold text-md">Paid </label>
                           <select name="paid" value={courseForm.formData.paid ? "true":"false"} id="" onChange={courseForm.handleChange} className="w-full outline-1 border-black rounded-xl px-5 py-2.5 text-black placeholder-gray-400">
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                           </select>
                            {error.paid && (<small className="text-xs text-red-400 font-semibold">{error.paid}</small>)}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-3 w-full ">

                        <div>
                            <label htmlFor="" className="uppercase font-semibold text-md">Course Level </label>
                             <select name="level" id="" value={courseForm.formData.level} onChange={courseForm.handleChange} className="w-full outline-1 border-black rounded-xl px-5 py-2.5 text-black placeholder-gray-400">
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                           </select>
                           {error.level && (<small className="text-xs text-red-400 font-semibold">{error.level}</small>)}
                        </div>


                        <div  className="lg:col-span-2 h-20 bg-gray-100 flex flex-col lg:flex-row items-center justify-center gap-x-8">
                            <div className="px-5 py-3 rounded-lg bg-myheroColor text-white">
                                <input type="file" name="thumbnail"   onChange={courseForm.handleFileChange} />
                            </div>

                            <div className="w-40 h-40 rounded-lg bg-white relative">
                                <Image src={imagePreview || "/images/noimage.jpg"} fill alt="course image"></Image>
                            </div>
                        </div>
                         {error.thumbnail && (<small className="text-xs text-red-400 font-semibold">{error.thumbnail}</small>)}
                    </div>

                        <div className="text-end col-span-2 ">
                            <button className="bg-myheroColor px-5 py-2.5 rounded-xl text-md font-semibold font-poppins text-white">
                                {loading ? <div className="inline-flex items-center gap-x-2">
                                    <span>Please wait</span>
                                    <Spinner/>
                                </div> : "Save and Continue"}
                            </button>
                        </div>
                     
                    </form>
                </div>
            </Modal>

        </div>
    )
}

export default Courses