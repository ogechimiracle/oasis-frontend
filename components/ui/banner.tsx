import Image from "next/image";
import Link from "next/link";

export interface BannerProps {
  title: string;
  pageName: string;
  image?: string;
}

function Banner({ title, pageName, image }: BannerProps) {
  return (
    <div className="w-full h-60 relative flex items-center justify-center">

      <Image
        src={image || "/images/banner2.jpg"}
        alt="banner image"
        fill
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Text */}
      <div className="relative text-white text-center">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <p className="text-sm font-semibold text-myprimaryColor"><Link href="/" className="text-white">Home</Link>/{pageName}</p>
      </div>

    </div>
  );
}

export default Banner;