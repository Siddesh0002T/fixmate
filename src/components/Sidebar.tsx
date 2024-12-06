'use client';

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // For active link styling
import { FiHome, FiUser, FiSettings, FiBriefcase } from "react-icons/fi";

interface SidebarProps {
  menuItems: {
    label: string;
    icon: JSX.Element;
    link: string;
  }[];
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems }) => {
  const pathname = usePathname(); // Get the current route

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-white text-gray-800 flex flex-col shadow-lg border-r border-gray-300">
      <div className="p-4 border-b border-gray-200 text-xl font-bold text-indigo-600">
        Fixmate
      </div>
      <nav className="flex-grow overflow-y-auto">
        <ul className="space-y-2 p-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.link}
                className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:bg-purple-100 hover:scale-105 ${
                  pathname === item.link ? "bg-purple-200 text-purple-800" : "text-gray-600"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
      <button className="">
  Logout
</button>


      </div>
    </div>
  );
};

export default Sidebar;
