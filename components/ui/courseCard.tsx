
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type CourseCardProps = {
    id:string,
  title: string;
  category: string;
  level?: "beginner" | "intermediate" | "advanced";
  price: any;
  description: string;
  isPaid: boolean;
  image: string;
  onGetCourseById?: (id: string) => void;
};

export default function CourseCard({
    id,
  title,
  category,
  level,
  price,
  isPaid,
  description,
  image,
    onGetCourseById,
}: CourseCardProps) {
  console.log("CourseCard image prop:", image);
  return (
    <Card className="rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
      <div className="relative w-full h-48 lg:h-55">
        <Image
          src={image || "/images/noimage.jpg"}
          alt={title}
          fill
          className="object-cover"
          unoptimized
          onError={(e) => {
            e.currentTarget.src = "/images/noimage.jpg";
          }}
        />

        {/* Level Badge */}
        <div className="absolute top-3 left-3">
          <Badge className="capitalize">{level}</Badge>
        </div>
      </div>

      <CardContent className="p-4 space-y-2">
        {/* Category */}
        <p className="text-sm text-gray-500">{category}</p>

        {/* Title */}
        <h3 className="text-lg font-semibold line-clamp-2">
          {title}
        </h3>

      
          <div className="text-sm text-gray-600 line-clamp-3">
            {description}
          </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-md font-bold">
            {isPaid ? `₦${price}` : "Free"}
          </span>

          <button className="text-sm px-3 py-1 rounded-lg bg-black text-white hover:bg-gray-800 transition" onClick={()=>onGetCourseById?.(id)}>
            View details
          </button>
        </div>
      </CardContent>
    </Card>
  );
}



