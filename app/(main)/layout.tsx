

// import './globals.css'
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "@/components/scrollTo";
import Script from "next/script";





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <ScrollToTop />
      <Nav />
      {children}
      <Footer />
      <Toaster />

      <Script id="chaport-config" strategy="afterInteractive">
        {`
          (function(w,d,v3){
            w.chaportConfig = {
              appId: '6a2d7789e5e5ce985ae60c61',
            };

            if(w.chaport)return;
            v3=w.chaport={};
            v3._q=[];
            v3._l={};
            v3.q=function(){v3._q.push(arguments)};
            v3.on=function(e,fn){
              if(!v3._l[e])v3._l[e]=[];
              v3._l[e].push(fn);
            };

            var s=d.createElement('script');
            s.type='text/javascript';
            s.async=true;
            s.src='https://app.chaport.com/javascripts/insert.js';

            var ss=d.getElementsByTagName('script')[0];
            ss.parentNode.insertBefore(s,ss);
          })(window, document);
        `}
      </Script>
    </div>
  );
}
