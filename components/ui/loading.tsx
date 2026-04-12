'use client'

import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-white ">
      
      <div className="flex flex-col items-center gap-4">

        {/* Oasis Logo */}
        <Image
          src="/images/logo.png"
          alt="Oasis Logo"
          width={80}
          height={80}
          className="animate-pulse"
        />

        {/* Loading text */}
        <p className="text-gray-600 text-md font-poppins">
          Integrated OASIS...
        </p>

        {/* spinner */}
        <div className="w-8 h-8 border-4 border-myprimaryColor border-t-transparent rounded-full animate-spin"></div>

      </div>

    </div>
  );
}