'use client'
import Banner from "@/components/ui/banner";
import { privacyPolicy } from "@/utils/terms";


function PrivacyPolicy(){
    return (
      <div>
        <Banner pageName="Privacy Policy" title="Privacy Policy" />

        <div className="px-5 lg:px-15 mt-10 mb-10">
          <div className="flex flex-col w-full gap-y-8 lg:px-10 ">
            {privacyPolicy.sections.map((items, index ) => (
              <div className="flex flex-col lg:flex-row items-start " key={index}>
                <div className="w-full lg:w-[30%]">
                  <p className="font-semibold text-xl text-black leading-10">{items.title}</p>
                </div>

                <div className="w-full lg:w-[70%] lg:px-8 px-4">
                  <p className="text-xl text-gray-700 leading-10 text-justify">{items.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
} 


export default PrivacyPolicy