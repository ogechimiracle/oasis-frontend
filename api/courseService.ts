import api from "./axios";

import { Course, Category, ApiResponse } from "@/types/course";

/**
 * Get all categories
 */
export const getCategories = async () => {
     const response = await api.get<
          ApiResponse<Category[]>
     >("/course/categories");

     return response.data.data;
};


/**
 * Get a category by slug
 */
export const getCategoryBySlug = async (
     categorySlug: string
) => {
     const response = await api.get<
          ApiResponse<Category>
     >(
          `/course/categories/${categorySlug}`
     );

     return response.data.data;
};


/**
 * Get all courses in a category
 */
export const getCoursesByCategory = async (
     categorySlug: string
) => {
     const response = await api.get<
          ApiResponse<Course[]>
     >(
          `/course/categories/${categorySlug}/courses`
     );

     return response.data.data;
};


/**
 * Get a single course
 */
export const getCourseBySlug = async (
     categorySlug: string,
     courseSlug: string
) => {
     const response = await api.get<
          ApiResponse<Course>
     >(
          `/course/categories/${categorySlug}/courses/${courseSlug}`
     );

     return response.data.data;
};