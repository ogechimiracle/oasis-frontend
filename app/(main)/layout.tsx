

// import './globals.css'
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "@/components/scrollTo";





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
        <div>
          <ScrollToTop/>
          <Nav />
          {children}
          <Footer />
          <Toaster/>
        </div>
        
     
  );
}
