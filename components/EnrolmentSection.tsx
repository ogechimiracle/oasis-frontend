// components/EnrollmentSection.tsx
"use client";

import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import PayButton from "@/components/paywithFlutterWave";
import toast from "react-hot-toast";

interface EnrollmentSectionProps {
  course: any;
}

export default function EnrollmentSection({ course }: EnrollmentSectionProps) {
  const { user } = useAuth();
  const router = useRouter();

  const handleAuthRedirect = () => {
    toast("Please sign in to register for this course");
    router.push("/auth");
  };

  return (
    <div className="space-y-3 pt-2">
      {!user ? (
        <button
          onClick={handleAuthRedirect}
          className="w-full py-3.5 px-4 bg-black text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition shadow-sm active:scale-[0.99]"
        >
          Sign in to Enroll
        </button>
      ) : (
        <PayButton course={course} />
      )}

      <button className="w-full py-3 px-4 bg-gray-100 text-gray-800 text-sm font-semibold rounded-xl hover:bg-gray-200 transition">
        Save for Later
      </button>
    </div>
  );
}
