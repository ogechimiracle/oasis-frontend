"use client";

import { getCategory } from "@/api/adminService";
import { getCourseById, getAllCourses } from "@/api/userService";
import Banner from "@/components/ui/banner";
import CourseCard from "@/components/ui/courseCard";
import { formatCurrency, truncateText, filterCourses } from "@/lib/helper";
import { useState, useEffect, useMemo } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useMediaQuery } from "usehooks-ts";
import { useAuth } from "@/context/authContext";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import PayButton from "@/components/paywithFlutterWave";
import CourseCardSkeleton from "@/components/CourseCardSkeleton";
import Image from "next/image";

function Courses() {
  const [refresh, setRefresh] = useState<boolean>(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(true);

  const { user } = useAuth();
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setPageLoading(true);
        const data = await getAllCourses();
        setCourses(data.data || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setPageLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const data = await getCategory();
        setCategories(data.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCourses();
    fetchCategories();
  }, [refresh]);

  const handleGetCourseById = async (id: string) => {
    try {
      setLoading(true);
      const data = await getCourseById(id);

      if (data.success) {
        setSelectedCourse(data.data);
        setOpenSheet(true);
      }
    } catch (error: any) {
      console.error(
        error?.response?.data?.message || "Error fetching course details",
      );
      toast.error("Failed to load course details.");
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = useMemo(() => {
    return filterCourses(courses, { search, category, level });
  }, [courses, search, category, level]);

  return (
    <div className="min-h-screen bg-gray-50/50 pb-16">
      <Toaster position="top-right" />

      <Banner title="Explore Our Courses" pageName="Course" />

      <div className="px-5 lg:px-16 w-full ">
        {/* Header & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-10 pb-6 border-b border-gray-200">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-2">
              All Courses
              <span className="text-sm font-semibold text-gray-500 bg-gray-200 px-2.5 py-0.5 rounded-full">
                {filteredCourses.length}
              </span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses..."
              className="px-4 py-2 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black bg-white w-full sm:w-auto"
            />

            {/* Category Filter */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black bg-white"
            >
              <option value="">All Categories</option>
              {categories?.map((item: any) => (
                <option value={item.name} key={item.slug || item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            {/* Level Filter */}
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="px-4 py-2 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black bg-white"
            >
              <option value="">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                  category={course.category?.name || "General"}
                  price={formatCurrency(course.cost)}
                  isPaid={course.paid}
                  description={truncateText(course.briefDefinition, 100)}
                  image={course.thumbnail}
                  onGetCourseById={() => handleGetCourseById(course.id)}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
                <p className="text-gray-500 font-medium">
                  No courses found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Production-Ready Course Details Drawer */}
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent
          side={isMobile ? "bottom" : "right"}
          className={`p-0 overflow-y-auto bg-white ${
            isMobile ? "max-h-[85vh] rounded-t-2xl" : "sm:max-w-xl md:max-w-2xl"
          }`}
        >
          {selectedCourse && (
            <div className="flex flex-col min-h-full">
              {/* Header Image & Close Area */}
              <div className="relative w-full h-52 bg-slate-900">
                <Image
                  src={selectedCourse.thumbnail || "/images/noimage.jpg"}
                  alt={selectedCourse.title}
                  fill
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md uppercase tracking-wider">
                    {selectedCourse.category?.name || "Category"}
                  </span>
                  <h2 className="text-xl font-bold leading-snug line-clamp-2">
                    {selectedCourse.title}
                  </h2>
                </div>
              </div>

              {/* Drawer Body Content */}
              <div className="p-6 space-y-6 flex-1">
                {/* Duration & Price Bar */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div>
                    <span className="text-xs text-gray-500 block">
                      Course Fee
                    </span>
                    <span className="text-xl font-extrabold text-gray-900">
                      {selectedCourse.paid
                        ? formatCurrency(selectedCourse.cost)
                        : "Free"}
                    </span>
                  </div>
                  {selectedCourse.duration && (
                    <div className="text-right">
                      <span className="text-xs text-gray-500 block">
                        Duration
                      </span>
                      <span className="text-sm font-semibold text-gray-800">
                        {selectedCourse.duration}
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                    Overview
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {selectedCourse.briefDefinition}
                  </p>
                </div>

                {/* Prerequisites */}
                {selectedCourse.prerequisite && (
                  <div className="space-y-2 bg-amber-50/60 p-4 rounded-xl border border-amber-100">
                    <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
                      Prerequisites
                    </h3>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      {selectedCourse.prerequisite}
                    </p>
                  </div>
                )}

                {/* Key Focus Areas */}
                {selectedCourse.keyAreas &&
                  selectedCourse.keyAreas.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                        Key Focus Areas
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedCourse.keyAreas.map(
                          (area: string, index: number) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 text-xs text-gray-700 border border-gray-100"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0"></span>
                              <span>{area.trim()}</span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}

                {/* Learning Outcomes */}
                {selectedCourse.outcomes &&
                  selectedCourse.outcomes.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                        What You'll Learn
                      </h3>
                      <ul className="space-y-2">
                        {selectedCourse.outcomes.map(
                          (outcome: string, index: number) => (
                            <li
                              key={index}
                              className="flex items-start gap-2.5 text-xs text-gray-600"
                            >
                              <svg
                                className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2.5"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span>{outcome.trim()}</span>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}

                {/* Job Roles */}
                {selectedCourse.jobRoles &&
                  selectedCourse.jobRoles.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                        Career Opportunities
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCourse.jobRoles.map(
                          (job: string, index: number) => (
                            <span
                              key={index}
                              className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md border border-blue-100"
                            >
                              {job.trim()}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  )}

                {/* Industry Application */}
                {selectedCourse.industries &&
                  selectedCourse.industries.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                        Industry Applications
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCourse.industries.map(
                          (industry: string, index: number) => (
                            <span
                              key={index}
                              className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md"
                            >
                              {industry.trim()}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  )}
              </div>

              {/* Sticky Action Footer */}
              <div className="p-4 bg-white border-t border-gray-200 sticky bottom-0">
                {!user ? (
                  <button
                    onClick={() => {
                      toast("Please sign in to register for a course");
                      router.push("/auth");
                    }}
                    className="w-full py-3 bg-black text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition"
                  >
                    Sign in to Enroll
                  </button>
                ) : (
                  <PayButton course={selectedCourse} />
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Global Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 w-full h-screen bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-white border-white/20 rounded-full animate-spin"></div>
            <p className="text-white text-sm font-medium mt-3">
              Loading details...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Courses;
