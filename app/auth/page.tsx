'use client'

import { RegisterUser } from "@/api/authService";
import Spinner from "@/components/ui/spinner";
import { useAuth } from "@/context/authContext";
import { useForm } from "@/lib/useForm";
import { loginValidation, registerValidation } from "@/validation/auth.schema";
import Image from "next/image"
import Link from "next/link";
import { useState } from "react"
import toast, { LoaderIcon } from "react-hot-toast";





function AuthPage (){
    type TabType = "login" | "register";
    const {login} = useAuth();
    const [loading, setLoading] = useState<boolean>(false)
    const [tab, setTab] = useState<TabType>('login')

    const [errors, setErrors] = useState<any>({})
    const [regError, setRegError]= useState<any>({})

    const {formData, handleChange} = useForm({
        email:"",
        password:""
    })

    const registerForm = useForm({
        email:"",
        password:"",
        confirmPassword:"",
    });
   

    const showLogin =()=>{
        setTab('login')
    }

    const showRegister=()=>{
        setTab('register')
    }

    const handleSubmitLogin = async (e: React.FormEvent)=>{
        e.preventDefault();

        const result = loginValidation.safeParse(formData);

        if (!result.success) {
            const formattedErrors: any = {};
            result.error.issues.forEach((err) => {
            formattedErrors[err.path[0]] = err.message;
            });

            setErrors(formattedErrors);
            return;
        }

        try {
            setLoading(true)
            const res:any = await login(formData.email,formData.password)
            if(res?.success){
                toast.success(res.message || 'Authentication Successful')
                
            }
            registerForm.resetForm()
        } catch (error:any) {
            setLoading(false)
            const message =
            error.response?.data?.message || "Login failed";

            toast.error(message);
        }finally{
            setLoading(false)
        }
    }


    const handlRegister =async(e: React.FormEvent)=>{
        e.preventDefault()

        const result = registerValidation.safeParse(registerForm.formData)
         if (!result.success) {
            const formattedErrors: any = {};
            result.error.issues.forEach((err) => {
            formattedErrors[err.path[0]] = err.message;
            });

            setRegError(formattedErrors);
            return;
        }

        try {
            setLoading(true)
            const res = await RegisterUser(registerForm.formData)
            if(res?.success){
                toast.success(res.message)
            }

        } catch (error:any) {
            setLoading(false)
            const message =
            error.response?.data?.message || "Registration Failed";
            toast.error(message);
        }finally{
            setLoading(false)
        }
    }

    return(
        <div className="flex items-center">

            <div className="w-full hidden lg:block">
              <Image src="/images/cyber.webp" width={400} height={420} alt="login image" className="object-fit h-110" />
            </div>

            <div className="w-full">
                <div className="flex flex-col items-center justify-center">

                    <div className="flex items-center gap-x-4 mb-4">
                        <Image src='/images/logo.png' alt="" width={70} height={80} className="obeject-fit w-12 h-12" />
                        <h1 className="text-sm font-semibold font-poppins">Integrated OASIS</h1>
                    </div>

                    <div className="w-full">
                        <div className="flex justify-between w-full bg-gray-100 relative">

                            <div
                                className={`absolute inset-0 w-1/2 bg-myprimaryColor transition-all duration-300 ease-in-out ${
                                    tab === "login" ? "left-1" : "left-1/2"
                                }`}
                            />

                            <div className={`px-5 z-10 py-2.5 cursor-pointer w-full ${tab === 'login'? '':''}`} onClick={showLogin}>Login</div>

                            <div className={`px-5 py-2.5 z-10 cursor-pointer w-full ${tab === 'register'? '':''}`} onClick={showRegister}>Register</div>

                        </div>

                        <div className="mt-3 px-4">

                            {tab === "login" &&(
                                <div>
                                   <form onSubmit={handleSubmitLogin}>
                                    <div>
                                        <label htmlFor="" className="font-poppins text-sm text-gray-500">Email</label>
                                        <input type="text" name="email" id="" value={formData.email} onChange={handleChange} className="w-full px-4 py-2.5 rounded-full text-sm outline-1 outline-gray-500 " placeholder="Mirx@cc.com" />
                                        {errors.email && (
                                            <p className="text-red-500 text-xs">{errors.email}</p>
                                        )}
                                    </div>

                                     <div className="mt-3">
                                        <label htmlFor="" className="font-poppins text-sm text-gray-500">Password</label>
                                        <input type="password" name="password" id="" value={formData.password} onChange={handleChange} className="w-full px-4 py-2.5 rounded-full text-sm outline-1 outline-gray-500 " placeholder="*******" />
                                        {errors.password && (
                                            <p className="text-red-500 text-xs">{errors.password}</p>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between my-3">
                                        <div className="flex items-center gap-x-2">
                                            <label htmlFor="" className="text-xs font-poppins">Remeber Me</label>
                                            <input type="checkbox" name="" id="" />
                                        </div>

                                        <Link href="" className="text-xs">Forgotten Password?</Link>
                                    </div>

                                    <div className="flex w-full justify-end">
                                        <button disabled={loading} className="px-8 cursor-pointer py-2.5 rounded-full bg-myprimaryColor text-black">
                                            {loading ==true ? <div className="flex items-center gap-x-2">
                                                <span className="text-xs font-semibold">Please Wait</span>
                                                <Spinner/>
                                            </div>:"Login"}
                                        </button>
                                    </div>

                                   </form>
                                </div>
                            )}


                            {tab === "register" && (
                                <div>
                                     <form onSubmit={handlRegister}>
                                    <div>
                                        <label htmlFor="" className="font-poppins text-sm text-gray-500">Email</label>
                                        <input type="email" name="email" id="" value={registerForm.formData.email} onChange={registerForm.handleChange} className="w-full px-4 py-2.5 rounded-full text-sm outline-1 outline-gray-500 " placeholder="Mirx" />
                                        {regError.email && (
                                            <p className="text-red-500 text-xs">{regError.email}</p>
                                        )}
                                    </div>

                                     <div className="mt-3">
                                        <label htmlFor="" className="font-poppins text-sm text-gray-500">Password</label>
                                        <input type="password" name="password" value={registerForm.formData.password} onChange={registerForm.handleChange} id="" className="w-full px-4 py-2.5 rounded-full text-sm outline-1 outline-gray-500 " placeholder="*******" />
                                         {regError.password && (
                                            <p className="text-red-500 text-xs">{regError.password}</p>
                                        )}
                                    </div>

                                     <div className="mt-3">
                                        <label htmlFor="" className="font-poppins text-sm text-gray-500">Confirm Password</label>
                                        <input type="password" name="confirmPassword" value={registerForm.formData.confirmPassword} onChange={registerForm.handleChange} id="" className="w-full px-4 py-2.5 rounded-full text-sm outline-1 outline-gray-500 " placeholder="confirm password" />
                                         {regError.confirmPassword && (
                                            <p className="text-red-500 text-xs">{regError.confirmPassword}</p>
                                        )}
                                    </div>

                                    <div className="flex w-full justify-end mt-4">
                                        <button disabled={loading} className="px-8 cursor-pointer py-2.5 rounded-full bg-myprimaryColor text-black">
                                            {loading == true ? <div className="flex items-center gap-x-2">
                                                <span>Please Wait</span>
                                                <Spinner/>
                                            </div>:"Create Account"}
                                        </button>
                                    </div>

                                   </form>
                                </div>
                            )}

                        </div>
                    </div>

                </div>
            </div>
            
        </div>
    )
}

export default AuthPage