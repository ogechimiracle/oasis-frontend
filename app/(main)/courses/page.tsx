'use client'

import { getCategory } from "@/api/adminService";
import { getCourseById, getAllCourses } from "@/api/userService";
import Banner from "@/components/ui/banner";
import CourseCard from "@/components/ui/courseCard";
import { formatCurrency, getCourseImageUrl, truncateText } from "@/lib/helper";
import { useState, useEffect, useMemo } from "react";
import { Sheet,SheetContent,SheetHeader,SheetTitle,SheetDescription,} from "@/components/ui/sheet";
import { useMediaQuery } from "usehooks-ts";
import { filterCourses } from "@/lib/helper";
import { useAuth } from "@/context/authContext";
import toast, { Toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import PayButton from "@/components/paywithFlutterWave";
import CourseCardSkeleton from "@/components/CourseCardSkeleton";









function Courses(){

    const [refresh, setRefresh] = useState<boolean>(false)
    const [courses, setCourses] = useState<any>([])
    const [categories, setCategories] = useState<any>([])
    const [selectedCourse, setSelectedCourse] = useState<any>(null)
    const [openSheet, setOpenSheet] = useState<boolean>(false)
    const [search, setSearch] = useState<string>("")
    const [level, setLevel] = useState<string>("")
    const [category, setCategory] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [pageLoading, setPageLoading] = useState<boolean>(true)

    const { user} = useAuth()
    const router = useRouter()

    const isMobile = useMediaQuery("(max-width: 768px)");

    useEffect(()=>{
        const fetchCourses = async()=>{
            try {
                setPageLoading(true)
                const data = await getAllCourses()
                console.log("Course data:", data)
                setCourses(data.data)
            } catch (error) {
                console.log(error)
            }finally{
                setPageLoading(false)
            }
        }

        const fetchCategories = async()=>{
            try {
                const data = await getCategory()
                setCategories(data.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCourses()
        fetchCategories()
    },[refresh])


    const handleGetCourseById = async(id:string)=>{
        try {
            setLoading(true)
            const data = await getCourseById(id)

            if(data.success){
                setSelectedCourse(data.data)
                setLoading(false)
                setOpenSheet(true)
            }
            
        } catch (error:any) {
            console.log(error.response?.data?.message)
        }
    }

    const filteredCourses = useMemo(() => {
        return filterCourses(courses, { search, category, level });
        }, [courses, search, category, level]);

        
    const handleEnroll = (item:any)=>{
        if(!user){
            toast("please sign in to register for course")
            router.push("/auth/")
            return 
        }
    }

    

    return (
      <div>
        <Banner title="Explore Our Course" pageName="Course" />

        <div className="px-8 lg:px-15">
          <div className="flex flex-col lg:flex-row items-center justify-between mt-10">
            <h1 className="text-2xl font-bold text-black">
              <span>All Courses</span>
              <span className="text-2xl font-semibold text-myheroColor">
                ({courses?.length || 0})
              </span>
            </h1>
            <div className="flex flex-wrap gap-x-5">
              <div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search courses..."
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-myprimaryColor"
                />
              </div>

              <div>
                <select
                  name=""
                  id=""
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-myprimaryColor mt-3 lg:mt-0 "
                >
                  <option value="">All Category</option>
                  {categories?.map((item: any, index: any) => (
                    <option value={item.name} key={item.slug}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  name=""
                  id=""
                  value={level}
                  onChange={(e) => {
                    setLevel(e.target.value);
                  }}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-myprimaryColor mt-3 lg:mt-0"
                >
                  <option value="">All Level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-5 gap-y-4">
              {pageLoading ? (
                Array.from({ length: 8 }).map((_, index) => (
                  <CourseCardSkeleton key={index} />
                ))
              ) : filteredCourses.length > 0 ? (
                filteredCourses.map((course: any) => (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    category={course.category.name}
                    
                    price={formatCurrency(course.cost)}
                    isPaid={course.paid}
                    description={truncateText(course.briefDefinition, 100)}
                    image={course.thumbnail}
                    onGetCourseById={() => handleGetCourseById(course.id)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center font-semibold font-poppins text-myheroColor">
                  No courses available
                </div>
              )}
            </div>
          </div>
        </div>

        <Sheet open={openSheet} onOpenChange={() => setOpenSheet(!openSheet)}>
          <SheetContent
            side={isMobile ? "bottom" : "right"}
            className={` overflow-y-scroll ${isMobile ? "max-h-[80vh]" : "lg:w-[40vw]"}
                `}
          >
            {selectedCourse && (
              <>
                <SheetHeader>
                  <div>
                    <img
                      src={selectedCourse.thumbnail}
                      alt={selectedCourse.title}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                  <SheetTitle>{selectedCourse.title}</SheetTitle>
                  <SheetDescription>
                    {selectedCourse.category.name}
                  </SheetDescription>
                </SheetHeader>

                <div className="mt-4 w-full px-4 pb-2">
                  <div className="flex flex-col  space-y-2">
                    <div className="flex flex-col">
                      <span className="font-semibold text-black">
                        Descriptions
                      </span>
                      <p className="text-sm text-gray-600">
                        {selectedCourse.briefDefinition}
                      </p>
                    </div>

                    <div className="flex flex-col">
                     
                    </div>

                    <div className="flex flex-col">
                      <span className="font-semibold text-black">
                        Prerequisite:{" "}
                      </span>
                      <p className="text-sm text-gray-600">
                        {selectedCourse.prerequisite}
                      </p>
                    </div>

                    <div className="flex flex-col">
                      <span className="font-semibold text-black">
                        Key Areas to Learn
                      </span>
                      <div className="text-sm text-gray-600">
                        {selectedCourse.keyAreas?.map(
                          (area: string, index: number) => (
                            <p key={index}>{area.trim()}</p>
                          ),
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <span className="font-semibold text-black">
                        What you'll do
                      </span>
                      <div className="text-sm text-gray-600">
                        {selectedCourse.outcomes?.map(
                          (outcome: string, index: number) => (
                            <p key={index}>{outcome.trim()}</p>
                          ),
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <span className="font-semibold text-black">
                        Job Roles
                      </span>
                      <div className="text-sm text-gray-600">
                        {selectedCourse.jobRoles?.map(
                          (job: string, index: number) => (
                            <p key={index}>{job.trim()}</p>
                          ),
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <span className="font-semibold text-black">
                        Industries Application
                      </span>
                      <div className="text-sm text-gray-600">
                        {selectedCourse.industries?.map(
                          (industry: string, index: number) => (
                            <p key={index}>{industry.trim()}</p>
                          ),
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <span className="font-semibold text-black">
                        Duration:{" "}
                      </span>
                      <p className="text-sm text-gray-600">
                        {selectedCourse.duration}
                      </p>
                    </div>

                    <div className="flex flex-col">
                      <span className="font-semibold text-black">Cost </span>
                      <p className="text-sm text-gray-600">
                        {formatCurrency(selectedCourse.cost)}
                      </p>
                    </div>

                    <div>
                      {/* <button className="bg-myprimaryColor text-black font-semibold rounded-lg px-5 py-3" onClick={()=>handleEnroll(selectedCourse)}>Enroll Now</button> */}
                      <PayButton course={selectedCourse} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </SheetContent>
        </Sheet>

        {loading && (
          <div className="fixed inset-0 w-full h-screen bg-black/70 z-50 flex items-center justify-center">
            <div className="flex flex-col items-center ">
              <div className="w-14 h-14 border-4 border-t-myprimaryColor border-gray-200 rounded-full animate-spin transition-transform ease-in-out duration-150"></div>
              <p className="text-white text-lg mt-4">Loading...</p>
            </div>
          </div>
        )}
      </div>
    );
}


export default Courses;