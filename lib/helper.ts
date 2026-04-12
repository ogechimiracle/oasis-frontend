// lib/zodError.ts
import { ZodError } from "zod";

export type FormErrors<T> = Partial<Record<keyof T, string>>;
import { FilterOptions, Course } from "@/utils/prop";

export function formatZodErrors<T>(error: ZodError): FormErrors<T> {
  const formattedErrors: FormErrors<T> = {};

  error.issues.forEach((err) => {
    const field = err.path[0] as keyof T;
    formattedErrors[field] = err.message;
  });

  return formattedErrors;
}


export function getCourseImageUrl(fileName:string){
   return `${process.env.NEXT_PUBLIC_BACKEND_BASE_COURSE_IMAGE_URL}${fileName}`;
}

export function truncateText(
  text: string,
  maxLength: number,
  suffix: string = "..."
): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + suffix;
}

export function formatCurrency(
  value: number,
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale).format(value);
}


export function filterCourses(
  courses: Course[],
  options: FilterOptions
): Course[] {
  const { search = "", category, level } = options;

  const hasSearch = search.trim() !== "";
  const hasCategory = !!category;
  const hasLevel = !!level;

  // ✅ return all if nothing selected
  if (!hasSearch && !hasCategory && !hasLevel) {
    return courses;
  }

  return courses.filter((course) => {
    // 🔍 search (title + description)
    const matchesSearch = hasSearch
      ? course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.briefDefinition.toLowerCase().includes(search.toLowerCase())
      : true;

    // 📂 category
    const matchesCategory = hasCategory
      ? course.category.name.toLowerCase() === category!.toLowerCase()
      : true;

    // 🎯 level
    const matchesLevel = hasLevel
      ? course.level.toLowerCase() === level!.toLowerCase()
      : true;

    return matchesSearch && matchesCategory && matchesLevel;
  });
}