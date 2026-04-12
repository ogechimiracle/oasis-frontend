'use client'
import Modal from "@/components/ui/modal";
import { useState, useEffect } from "react";
import {FaPlus} from "react-icons/fa"
import {Table,TableBody,TableCaption,TableCell,TableFooter,TableHead,TableHeader,TableRow,} from "@/components/ui/table"
import { useForm } from "@/lib/useForm";
import Spinner from "@/components/ui/spinner";
import { categoryValidation } from "@/validation/course.schema";
import { formatZodErrors } from "@/lib/helper";
import { AddCategory, getCategory } from "@/api/adminService";
import { formatCustomDateTime } from "@/lib/utils";
import toast from "react-hot-toast";






function CourseCategories(){
    const [openModal, setOpenModal]= useState<boolean>(false)
    const [category, setCategory] = useState<any>([])
    const [errors, setErrors] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [refresh, setRefresh] = useState<boolean>(false)
    
    const {formData, handleChange} = useForm({
        name:"",
        slug:"",
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleFormSubmit = async(e:React.FormEvent)=>{
        e.preventDefault();

        const result = categoryValidation.safeParse(formData);
       
        if (!result.success) {
            const errors = formatZodErrors<typeof formData>(result.error);
            setErrors(errors);
            return;
        }
         console.log("form reached")

        try {
            setIsLoading(true)
            const result = await AddCategory(formData)
            if(result.success){
                toast.success(result.message)
                formData.name=""
                formData.slug=""
                setOpenModal(false)
                setRefresh(prev => !prev)
            }
        } catch (error:any) {
            toast.error(error.response?.data?.message)
        }finally{
            setIsLoading(false)
        }
    }


    useEffect(() => {
     const fetchCategories = async () => {
      try {
        const data = await getCategory();
        setCategory(data.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories()
    }, [refresh])


    return(
        <div>
            <div className="flex justify-between items-center">
                <div>
                    All Course Categories
                </div>
                <button className="flex items-center gap-x-3 rounded-full px-5 py-2.5 border border-black hover:bg-black hover:text-white transition-colors duration-200 ease-in cursor-pointer"
                onClick={()=>setOpenModal(true)}
                >
                    <span>Add Category</span>
                    <FaPlus size={15}/>
                </button>
            </div>

            <div className="mt-10">
                <p className="text-lg font-semibold">Categories</p>

                <div className="mt-5 bg-white rounded-xl shadow-sm p-1">
                    <Table>
                        <TableCaption>All Categories</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                           
                            <TableBody>

                                {
                                   category.length > 0 ? 
                                   (
                                    category.map((item:any, index:any)=>(
                                    <TableRow key={index}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.slug}</TableCell>
                                        <TableCell>{formatCustomDateTime(item.createdAt)}</TableCell>
                                        <TableCell className="space-x-3">
                                            <button className="rounded-lg bg-red-500 text-white text-xs px-4 py-2">Delete</button>
                                            <button className="bg-mygreenColor px-4 py-2 rounded-lg text-xs text-white">Edit</button>
                                        </TableCell>
                                    </TableRow>
                                    ))
                                   )
                                   :
                                   (
                                    <TableRow className="">
                                        <TableCell colSpan={5} className="py-5 font-semibold text-red-700">No category created</TableCell>
                                    </TableRow>
                                   )
                                }

                            </TableBody>
                        
                    </Table>
                </div>
            </div>

                <Modal
                    isOpen={openModal}
                    title="Add Course Category"
                    onClose={() => setOpenModal(false)}
                    widthClass="w-180"
                >
                    <div className=" w-full">
                        <form onSubmit={handleFormSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="">Category Name</label>
                                <input type="name" name="name" value={formData.name} onChange={handleChange} id="" placeholder="Category name" className="w-full px-5 py-3 rounded-xl border border-gray-500 outline-none  " />
                                {errors.name  &&(
                                    <p className="text-red-500 text-xs">{errors.name}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="">Category Slug</label>
                                <input type="text" name="slug" value={formData.slug} onChange={handleChange} id="" placeholder="Category slug" className="w-full px-5 py-3 rounded-xl border border-gray-500 outline-none  " />
                                {errors.slug &&(
                                    <p className=" text-red-800 text-xs">{errors.slug}</p>
                                )}
                            </div>

                            <div className="mt-8 text-end">
                                <button type="submit" className="px-5 py-2.5 rounded-xl bg-myprimaryColor text-black">
                                   {isLoading === true ? (
                                    <div className="flex items-center gap-x-4">
                                        <span className="text-sm">Plese wait</span>
                                        <Spinner/>
                                    </div>
                                   ):(
                                    <span>Submit</span>
                                   )}
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>

        </div>
    )
}

export default CourseCategories;