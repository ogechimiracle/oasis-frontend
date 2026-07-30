

import { getCoursesByCategory, getCategoryBySlug } from "@/api/courseService";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import CourseCard from "@/components/ui/courseCard";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

// Optional: Dynamic Metadata for SEO
export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  try {
    const categoryData = await getCategoryBySlug(category);
    return {
      title: `${categoryData?.name || "Category"} Courses | Learn Online`,
      description: `Explore our collection of top-rated ${categoryData?.name || ""} courses.`,
    };
  } catch {
    return { title: "Category Not Found" };
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  let categoryData;
  let courses = [];

  try {
    const [fetchedCategory, fetchedCourses] = await Promise.all([
      getCategoryBySlug(category),
      getCoursesByCategory(category),
    ]);

    categoryData = fetchedCategory;
    courses = fetchedCourses;

    // If category slug doesn't exist in your backend, throw 404
    if (!categoryData) {
      notFound();
    }
  } catch (error) {
    console.error("Error fetching category data:", error);
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50/50 pb-20">
      {/* Hero / Category Header */}
      <section className="bg-white border-b border-gray-200 py-12 px-5 lg:px-16">
        <div className="max-w-7xl mx-auto space-y-4">
          <nav className="text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:underline">
              Home
            </Link>{" "}
            /{" "}
            <Link href="/courses" className="hover:underline">
              Courses
            </Link>{" "}
            /{" "}
            <span className="text-gray-900 font-medium capitalize">
              {categoryData.name}
            </span>
          </nav>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 capitalize">
            {categoryData.name} Courses
          </h1>

          <p className="text-base md:text-lg text-gray-600 max-w-2xl">
            {categoryData.name??
              `Explore our curated selection of top-rated ${categoryData.name} courses to build your skills.`}
          </p>

          <div className="pt-2 text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {courses.length}
            </span>{" "}
            {courses.length === 1 ? "course" : "courses"}
          </div>
        </div>
      </section>

      {/* Courses Grid Section */}
      <section className="w-full px-5 lg:px-16 pt-10">
        {courses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300 p-8">
            <h3 className="text-lg font-semibold text-gray-800">
              No courses found
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              We couldn't find any courses in this category right now.
            </p>
            <Link
              href="/courses"
              className="mt-4 inline-block text-sm font-medium text-white bg-black px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Browse all courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course: any) => (
              <Link
                key={course.id}
                href={`/courses/${category}/${course.slug}`}
                className="block h-full transition-transform duration-200 hover:-translate-y-1"
              >
                <CourseCard
                  id={course.id}
                  title={course.title}
                  category={categoryData.name}
                  level={course.level}
                  price={course.cost}
                  isPaid={course.isPaid}
                  description={course.briefDefinition || course.description}
                  image={course.thumbnail}
                />
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
