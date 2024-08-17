"use client"
import React, { useState, useCallback } from "react";
import { IoLogoEdge, IoBookmark } from "react-icons/io5";
import {
  BsImageFill,
  BsFillHandbagFill,
  BsFillStarFill,
  BsHouseFill,
} from "react-icons/bs";
import { RiSettings4Fill } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

interface NavigationItem {
  name: string;
  link: string;
}

interface SidebarProps {
  navigationData: NavigationItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ navigationData }) => {
  const [currentRoute, setCurrentRoute] = useState("Home");
  const [expanded, setExpanded] = useState(false);

  const renderIcon = useCallback((element: NavigationItem) => {
    switch (element.name) {
      case "Home":
        return <BsHouseFill />;
      case "Blouse Designs":
        return <BsFillHandbagFill />;
      case "Main Fabric Store":
        return <BsFillHandbagFill />;
      case "Lining Fabric Store":
        return <BsFillHandbagFill />;
      case "Saved":
        return <IoBookmark />;
      default:
        return null;
    }
  }, []);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <nav
      className={classNames([
        "fixed left-0 top-0 bottom-0 z-50 bg-gradient-to-br from-[#FACBEA] to-[#FFE4D6] flex flex-col justify-between items-center py-6 rounded-tr-4xl rounded-br-4xl",
        expanded ? "w-40" : "w-14",
      ])}
    >
      <span
        className="transform transition duration-300 hover:scale-110 hower:shadow-xl text-3xl text-black-800 hover:text-gray-800 cursor-pointer"
        onClick={toggleSidebar}
      >
        ☰
      </span>
      <span className="text-4xl text-gray-800 transform transition duration-300 hover:scale-110 hower:shadow-xl">
        <Image src="/images/logo/logo-4u.png" alt="wetailor4u_logo" width={80} height={60} />
      </span>
      <ul className="flex flex-col items-left w-full">
        {navigationData.map((element, index) => (
          <li
            key={index}
            className={classNames([
              "text-black-800 hover:text-gray-800 text-xl py-5 cursor-pointer",
              currentRoute === element.name && "text-blue-600 hover:text-blue-700",
            ])}
          >
            <Link href={element.link}
              onClick={() => setCurrentRoute(element.name)}
              className={classNames([
                "relative flex items-center",
                expanded ? "justify-left pl-6" : "justify-center",
              ])}
            >
              {renderIcon(element)}
              <span
                className={classNames([
                  "text-base font-medium transition duration-100 hover:scale-110 hower:shadow-xl",
                  expanded ? "ml-2" : "hidden",
                ])}
              >
                {element.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex flex-col justify-between items-center">{/* Bell icon */}</div>
    </nav>
  );
};

export default Sidebar;
