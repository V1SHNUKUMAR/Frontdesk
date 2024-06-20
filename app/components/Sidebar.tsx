"use client";

import Image from "next/image";
import React, { useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { FaRegHourglass } from "react-icons/fa6";
import { GoQuestion } from "react-icons/go";
import { HiOutlineExternalLink } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import {
  LuArrowRightLeft,
  LuCalendarDays,
  LuLayoutDashboard,
} from "react-icons/lu";
import { RiListOrdered2 } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { TbWorld } from "react-icons/tb";
import { VscLayoutSidebarRight } from "react-icons/vsc";

interface sidebarPropType {
  isSidebarOpen: boolean;
  setIsSidebarOpen: any;
  isSidebarOpenForMobile: boolean;
  setIsSidebarOpenForMobile: any;
}

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  isSidebarOpenForMobile,
  setIsSidebarOpenForMobile,
}: sidebarPropType) => {
  const [activeTabIndex, setActiveTabIndex] = useState(3);

  const options = [
    {
      icon: <RiListOrdered2 className="text-xl lg:text-base" />,
      label: "Orders",
    },
    {
      icon: <BiAddToQueue className="text-xl lg:text-base" />,
      label: "Subscriptions",
    },
    {
      icon: <LuCalendarDays className="text-xl lg:text-base" />,
      label: "Calendar",
    },
    {
      icon: <FaRegHourglass className="text-xl lg:text-base" />,
      label: "Waitlist",
    },
  ];

  return (
    <div
      className={`${isSidebarOpen ? "lg:w-60" : "lg:w-12"} 
      ${isSidebarOpenForMobile ? "translate-x-0" : "-translate-x-full"}
       lg:translate-x-0 h-full lg:h-screen w-full bg-slate-400/25 lg:bg-transparent backdrop-blur-lg lg:backdrop-blur-none fixed lg:sticky top-0 left-0 z-50 overflow-hidden duration-300`}
    >
      <div
        className={`h-full w-full lg:w-60 px-5 lg:px-2 py-5 flex flex-col justify-between gap-1`}
      >
        <div>
          <div className="flex justify-between items-center gap-1 pl-2 w-full">
            <button
              onClick={() => setIsSidebarOpen((currVal: boolean) => !currVal)}
              className="flex gap-3 items-center pointer-events-none lg:pointer-events-auto"
            >
              <Image src="/brand-logo.svg" width={25} height={25} alt="logo" />
              <h1
                className={`font-bold text-xl lg:text-lg duration-300 ${
                  isSidebarOpen ? "" : "opacity-0"
                }`}
              >
                Front-desk
              </h1>
            </button>
            <button
              onClick={() => setIsSidebarOpenForMobile(false)}
              className="mr-3 lg:hidden"
            >
              <RxCross2 size={25} />
            </button>
            <button
              onClick={() => setIsSidebarOpen((currVal: boolean) => !currVal)}
              className="hidden lg:block"
            >
              <VscLayoutSidebarRight color="LightSlateGray" />
            </button>
          </div>
          <div className="my-8 w-full">
            <div
              className={`flex items-center gap-1 px-3 bg-white shadow-sm shadow-slate-300 rounded-md py-2.5 ${
                isSidebarOpen ? "" : "gap-0 pl-2"
              }`}
            >
              <input
                type="text"
                name="location"
                id="location"
                className={`w-full text-sm outline-none bg-transparent placeholder:text-slate-700 duration-300 placeholder:font-medium ${
                  isSidebarOpen ? "" : "opacity-0 max-w-0"
                }`}
                placeholder="Location Name"
              />
              <LuArrowRightLeft className="text-slate-700" />
            </div>
            <button className="w-11/12 text-start bg-slate-200 shadow-sm shadow-slate-300 rounded-md rounded-t-none px-2 py-1 mx-auto block">
              <p
                className={`duration-300 ${
                  isSidebarOpen ? "" : "w-0 h-0 opacity-0"
                }`}
              >
                <span className="font-bold text-lg mr-3">08:30 AM</span>Tue 20
                Jan
              </p>
              <div className="flex items-center justify-between gap-1 text-sm mt-1">
                <div className={`flex items-center gap-1`}>
                  <TbWorld className="text-slate-700" />

                  <p className={`*${isSidebarOpen ? "" : "w-0 opacity-0"}`}>
                    UTC: +5 hours
                  </p>
                </div>
                <IoIosArrowDown
                  className={`text-slate-700 ${
                    isSidebarOpen ? "" : "w-0 opacity-0"
                  }`}
                />
              </div>
            </button>
          </div>
          <ul className="space-y-1 my-5">
            {options.map((option, index) => (
              <li
                key={index}
                className={`cursor-pointer flex gap-3 items-center px-3 py-2 lg:py-1.5 rounded-lg hover:bg-white ${
                  activeTabIndex === index ? "bg-white shadow-sm" : ""
                }`}
              >
                {option.icon}
                <p
                  className={`lg:text-sm duration-300 ${
                    isSidebarOpen ? "" : "opacity-0"
                  }`}
                >
                  {option.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-2">
          <div className="cursor-pointer flex justify-between gap-1 items-center px-3 py-2 lg:py-1.5 hover:bg-white rounded-lg">
            <div className="flex gap-3 items-center">
              <LuLayoutDashboard className="text-xl lg:text-base" />
              <p
                className={`lg:text-sm duration-300 ${
                  isSidebarOpen ? "" : "opacity-0"
                }`}
              >
                Dashboard
              </p>
            </div>
            <HiOutlineExternalLink className="text-xl lg:text-base" />
          </div>
          <div
            className={`cursor-pointer py-2 shadow-sm flex gap-1 justify-between items-center bg-white rounded-lg duration-300 ${
              isSidebarOpen ? "px-3" : "px-1"
            }`}
          >
            <div className="flex items-center gap-3">
              <Image
                src="/profile-pic.svg"
                alt="profile pic"
                width={30}
                height={30}
              />
              <div
                className={`lg:text-sm duration-300 ${
                  isSidebarOpen ? "" : "opacity-0"
                }`}
              >
                <p className="font-semibold">Admin name</p>
                <p className="text-slate-400 text-xs">adminname@mail.com</p>
              </div>
            </div>
            <IoIosArrowDown color="LightSlateGray" />
          </div>
          <div className="cursor-pointer px-3 py-1.5 flex items-center gap-3 hover:bg-white rounded-lg">
            <GoQuestion size={20} />
            <div
              className={`lg:text-sm duration-300 ${
                isSidebarOpen ? "" : "opacity-0"
              }`}
            >
              <p>Help center</p>
              <p className="text-slate-400 text-xs">@2024 Omnify.Inc.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
