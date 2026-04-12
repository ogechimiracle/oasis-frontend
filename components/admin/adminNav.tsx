'use client'

import { oasisAdminNavLinks } from "@/utils/constant";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import {BiChevronDown, BiX, BiMenu } from "react-icons/bi"



function AdminNav(){

    const pathname = usePathname();

    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const toggleDropdown = (name: string) => {
        setOpenDropdown((prev) => (prev === name ? null : name));
    };

    // Close sidebar when route changes (mobile UX)
    useEffect(() => {
        setIsMobileOpen(false);
    }, [pathname]);

   return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-gray-200 shadow-sm text-black">
        <div className="flex items-center gap-x-4">
            <Image src='/images/logo1.png' alt="logo" height={30} width={30} />
            <h2 className="text-sm font-bold">Integrated OASIS</h2>
        </div>
        <button onClick={() => setIsMobileOpen(true)}>
          <BiMenu size={24} />
        </button>
      </div>

      {/*  Overlay (Mobile) */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* 🔥 Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          w-72 h-screen bg-gray-100 text-black p-5 overflow-y-auto
          transform transition-transform duration-300
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:block
        `}
      >
        {/* Close Button (Mobile) */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-x-4">
            <Image src='/images/logo1.png' alt="logo" height={30} width={30} />
            <h2 className="text-xl font-semibold">Integrated OASIS</h2>
        </div>
          <button
            className="lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          >
            <BiX size={22} />
          </button>
        </div>

        <nav className="space-y-2">
          {oasisAdminNavLinks.map((item) => {
            const isActive = pathname === item.path;

            // 🔥 Dropdown Item
            if (item.children) {
              const isOpen = openDropdown === item.name;

              return (
                <div key={item.name}>
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={20} />
                      <span className="">{item.name}</span>
                    </div>

                    <BiChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Animation */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-96 mt-2" : "max-h-0"
                    }`}
                  >
                    <div className="ml-6 space-y-1">
                      {item.children.map((child) => {
                        const childActive = pathname === child.path;
                        
                        return (
                          <Link
                            key={child.name}
                            href={child.path!}
                            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition ${
                              childActive
                                ? "bg-myprimaryColor text-black"
                                : "text-gray-800 hover:bg-slate-800 hover:text-white"
                            }`}
                          >
                            <child.icon size={18} />
                            {child.name}

                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }

            // 🔥 Normal Link
            return (
              <Link
                key={item.name}
                href={item.path!}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-myprimaryColor text-black"
                    : "text-black hover:bg-slate-800 hover:text-white"
                }`}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export default AdminNav