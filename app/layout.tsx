
import type { Metadata } from "next";
import { Poppins, Geist } from "next/font/google";
import { AuthProvider } from "@/context/authContext";
import "./globals.css";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Script from "next/script";


const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100","200","300","400", "500", "600", "700","800", "900"],
});

// export const metadata: Metadata = {
//   title: "Integrated Oasis",
//   description: "Learn your tech Skills with at Integrated OASIS",
// };

export const metadata: Metadata = {
  metadataBase: new URL("https://oasisintech.com"),

  title: {
    default:
      "Integrated Oasis ICT Serivices | Tech Training in Owerri, Nigeria",
    template: "%s | Integrated Oasis Institute of Technology",
  },

  description:
    "Integrated Oasis ICT Services (Integrated Oasis) is a leading technology institute in Owerri, Imo State, Nigeria, offering professional training in Software Engineering, UI/UX Design, Data Science, Cybersecurity, Cloud Computing, Digital Marketing, AI, Product Design, and more.",

  keywords: [
    "Integrated Oasis",
    "Integrated Oasis Institute of Technology",
    "Tech Institute Nigeria",
    "Software Engineering Training",
    "Computer Center",
    "Computer training institute",
    "ICT training Center in owerri",
    "Digital Skill Center",
    "Coding School Nigeria",
    "Programming School Owerri",
    "Tech School Imo State",
    "Learn Programming Nigeria",
    "Software Development",
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
    "Laravel Training",
    "React Training",
    "Next.js Course",
    "Python Training",
    "UI UX Design",
    "Data Science",
    "Cybersecurity",
    "Artificial Intelligence",
    "Machine Learning",
    "Cloud Computing",
    "Digital Marketing",
    "Graphics Design",
    "Product Design",
    "Tech Academy",
    "Coding Bootcamp Nigeria",
    "ICT Training Centre owerri",
    "Tech Trainning Institute Owerri",
    "Best Tech Institute in Owerri",
    "Coding School Owerri",
    "Programming School Imo State",
    ""
  ],

  creator: "Integrated Oasis Institute of Technology",

  publisher: "Integrated Oasis Institute of Technology",

  category: "Education",

  alternates: {
    canonical: "https://oasisintech.com",
  },

  openGraph: {
    title: "Integrated Oasis Institute of Technology",
    description:
      "Professional technology training institute in Owerri, Nigeria helping students build careers in Software Engineering, Data Science, UI/UX, Cybersecurity and AI.",

    url: "https://oasisintech.com",

    siteName: "Integrated Oasis",

    locale: "en_NG",

    type: "website",

    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Integrated Oasis Institute of Technology",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Integrated Oasis Institute of Technology",

    description:
      "Learn Software Engineering, UI/UX, Data Science, Cybersecurity and more in Owerri, Nigeria.",

    images: ["/images/logo.png"],
  },

  robots: {
    index: true,

    follow: true,

    nocache: false,

    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: "YOUR_GOOGLE_SEARCH_CONSOLE_CODE",

    yandex: "",

    yahoo: "",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={` ${poppins.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PY1Z9FWYPV"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag(){
              dataLayer.push(arguments);
            }

            gtag('js', new Date());

            gtag('config', 'G-PY1Z9FWYPV');
          `}
        </Script>
      </body>
    </html>
  );
}
