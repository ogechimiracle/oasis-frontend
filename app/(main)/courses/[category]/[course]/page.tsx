// app/courses/[category]/[course]/page.tsx

import { getCourseBySlug } from "@/api/courseService";
import Link from "next/link";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { Metadata } from "next";
import EnrollmentSection from "@/components/EnrolmentSection";



interface CoursePageProps {
  params: Promise<{
    category: string;
    course: string;
  }>;
}

interface EnrollmentSectionProps {
  course: any;
}

// Dynamic SEO Metadata
export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { category, course } = await params;
  try {
    const courseData = await getCourseBySlug(category, course);
    return {
      title: `${courseData?.title || "Course"} | Learn Online`,
      description:
        courseData?.briefDefinition ||
        "Master new skills with our hands-on course.",
    };
  } catch {
    return { title: "Course Not Found" };
  }
}



export default async function CoursePage({ params }: CoursePageProps) {
  const { category, course } = await params;

  let courseData;

  try {
    courseData = await getCourseBySlug(category, course);

    if (!courseData) {
      notFound();
    }
  } catch (error) {
    console.error("Error loading course page:", error);
    notFound();
  }

  // Format currency based on your earlier setup (naira default with fallback)
  const isPaid = courseData.paid ?? courseData.paid;
  const priceDisplay = isPaid
    ? typeof courseData.cost === "number"
      ? `₦${courseData.cost.toLocaleString()}`
      : `₦${courseData.cost}`
    : "Free";



  return (
    <main className="min-h-screen bg-gray-50/50 pb-24">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white border-b border-slate-800 py-12 lg:py-16 px-5 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Hero Header Info */}
          <div className="lg:col-span-2 space-y-4">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-xs md:text-sm text-slate-400">
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
              <span>/</span>
              <Link href="/courses" className="hover:text-white transition">
                Courses
              </Link>
              <span>/</span>
              <Link
                href={`/courses/${category}`}
                className="hover:text-white capitalize transition"
              >
                {category}
              </Link>
              <span>/</span>
              <span className="text-slate-200 font-medium truncate max-w-[150px] sm:max-w-xs">
                {courseData.title}
              </span>
            </nav>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 capitalize">
                {courseData.category?.name || category}
              </span>
              {courseData.level && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 capitalize">
                  {courseData.level} Level
                </span>
              )}
            </div>

            {/* Title & Description */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {courseData.title}
            </h1>

            <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-3xl">
              {courseData.briefDefinition}
            </p>

            {/* Quick Stats Bar */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-slate-300 border-t border-slate-800/80">
              {courseData.duration && (
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    Duration: <strong>{courseData.duration}</strong>
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Certificate of Completion</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area + Sidebar Container */}
      <section className="max-w-7xl mx-auto px-5 lg:px-16 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Course Body Details */}
          <div className="lg:col-span-2 space-y-10">
            {/* Key Learning Areas */}
            {courseData.keyAreas && courseData.keyAreas.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </span>
                  Key Focus Areas
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {courseData.keyAreas.map((area: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
                    >
                      <span className="w-2 h-2 rounded-full bg-indigo-600 mt-2 shrink-0"></span>
                      <span className="text-sm font-medium text-gray-800">
                        {area}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Learning Outcomes */}
            {courseData.outcomes && courseData.outcomes.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                  What You'll Learn
                </h2>
                <ul className="grid grid-cols-1 gap-3 pt-2">
                  {courseData.outcomes.map((outcome: string, index: number) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-gray-700 text-sm md:text-base"
                    >
                      <svg
                        className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5"
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
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Prerequisites */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </span>
                Prerequisites
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed pl-1">
                {courseData.prerequisite ||
                  "No prerequisites required. Suitable for beginners."}
              </p>
            </div>

            {/* Career Opportunities / Job Roles */}
            {courseData.jobRoles && courseData.jobRoles.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  Career Opportunities
                </h2>
                <div className="flex flex-wrap gap-2 pt-1">
                  {courseData.jobRoles.map((role: string, index: number) => (
                    <span
                      key={index}
                      className="px-3.5 py-1.5 bg-blue-50 text-blue-700 font-medium text-xs sm:text-sm rounded-lg border border-blue-100"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar (Enrollment Box) */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden space-y-6 p-6">
              {/* Optional Thumbnail / Preview */}
              {courseData.thumbnail && (
                <div className="relative w-full h-44 rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={courseData.thumbnail}
                    alt={courseData.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Price Tag */}
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  Course Fee
                </span>
                <div className="text-3xl font-extrabold text-gray-900">
                  {priceDisplay}
                </div>
              </div>

              {/* Call to Action Buttons */}
              <div className="space-y-3 pt-2">
              <EnrollmentSection course={courseData}/>
              </div>

              {/* Included Highlights */}
              <div className="border-t border-gray-100 pt-5 space-y-3 text-xs text-gray-600">
                <p className="font-semibold text-gray-900">
                  This course includes:
                </p>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span>Full lifetime access</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Access on mobile and desktop</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
