"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type CourseCardProps = {
  id: string;
  title: string;
  category: string;
  level?: "beginner" | "intermediate" | "advanced";
  price: any;
  description: string;
  isPaid?: boolean;
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
  // Safely parse numeric price for calculation
  const numericPrice =
    typeof price === "string"
      ? parseFloat(price.replace(/[^0-9.]/g, ""))
      : Number(price);

  const hasNumericPrice = !isNaN(numericPrice) && numericPrice > 0;
  const discountedPrice = hasNumericPrice ? Math.round(numericPrice * 0.6) : 0;

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

        {/* Unconditional 40% Discount Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-extrabold bg-rose-600 text-white shadow-md tracking-wide">
            40% OFF
          </span>
        </div>
      </div>

      <CardContent className="p-4 space-y-2">
        {/* Category */}
        <p className="text-sm text-gray-500">{category}</p>

        {/* Title */}
        <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>

        <div className="text-sm text-gray-600 line-clamp-3">{description}</div>

        {/* Price & Discount Section */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            {hasNumericPrice ? (
              <div className="flex items-baseline gap-2">
                <span className="text-md font-bold text-slate-900">
                  ₦{discountedPrice.toLocaleString()}
                </span>
                <span className="text-xs text-gray-400 line-through">
                  ₦{numericPrice.toLocaleString()}
                </span>
              </div>
            ) : (
              <span className="text-md font-bold">
                {price ? `₦${price}` : "Free"}
              </span>
            )}
          </div>

          <button
            className="text-sm px-3 py-1 rounded-lg bg-black text-white hover:bg-gray-800 transition"
            onClick={() => onGetCourseById?.(id)}
          >
            View details
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
