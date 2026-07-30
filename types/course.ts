export interface Category {
     id: string;
     name: string;
     slug: string;
     createdAt: string;

     _count?: {
          courses: number;
     };
}

export type CourseLevel =
     | "beginner"
     | "intermediate"
     | "advanced";

export interface Course {
     id: string;
     title: string;
     slug: string;
     briefDefinition: string;
     prerequisite?: string | null;

     keyAreas?: string[];
     outcomes?: string[];
     jobRoles?: string[];
     industries?: string[];

     duration?: string | null;
     cost?: number | null;
     paid: boolean;
     thumbnail?: string | null;

     status?: "draft" | "published" | "archived";

     level: CourseLevel;

     createdAt: string;
     updatedAt?: string;

     category: {
          id: string;
          name: string;
          slug: string;
     };
}

export interface ApiResponse<T> {
     success: boolean;
     message: string;
     data: T;
}