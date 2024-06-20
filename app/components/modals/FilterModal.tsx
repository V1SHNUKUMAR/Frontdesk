"use client";

import React, { useEffect, useRef, useState } from "react";
import { FiCalendar, FiSearch } from "react-icons/fi";
import { LuLayoutDashboard, LuUsers } from "react-icons/lu";

interface PropTypes {
  showFilterModal: boolean;
  setShowFilterModal: any;
}

const FilterModal = ({ showFilterModal, setShowFilterModal }: PropTypes) => {
  const [activeTab, setActiveTab] = useState(0);

  const options = [
    {
      id: 1,
      icon: <FiCalendar className="inline mr-2" size={15} />,
      label: "Scheduled Date",
      suffixCount: "1",
    },
    {
      id: 2,
      icon: <LuUsers className="inline mr-2" size={15} />,
      label: "People",
    },
    {
      id: 3,
      icon: <LuLayoutDashboard className="inline mr-2" size={15} />,
      label: "Services/Products",
    },
  ];

  const handleReset = () => {};

  const dateInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (dateInputRef.current) {
      console.log("clicked");
      dateInputRef.current.click();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowFilterModal(false);
        setActiveTab(0);
      }
    };

    if (showFilterModal) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showFilterModal, setShowFilterModal]);

  return (
    <div
      ref={modalRef}
      className={`overflow-hidden absolute -left-3 lg:left-0 top-full mt-2 z-50 lg:text-xs bg-white w-[95vw] lg:w-[600px] rounded-lg border shadow-lg duration-300 ${
        showFilterModal ? "opacity-100 mt-4" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex divide-x min-h-80">
        <div className="w-2/5 bg-slate-50 p-2">
          <ul className="space-y-1 font-medium">
            {options.map((option, index) => (
              <li key={option.id} className="w-full">
                <button
                  onClick={() => setActiveTab(index)}
                  className={`w-full rounded-md flex ${
                    option.suffixCount
                      ? "justify-between"
                      : "justify-center sm:justify-start"
                  } lg:items-center lg:gap-1 px-3 py-2 ${
                    activeTab === index ? "bg-slate-200" : ""
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                    {option.icon}
                    <span className="text-xs lg:text-sm">{option.label}</span>
                  </div>

                  {option?.suffixCount && (
                    <p className="text-xs lg:text-sm">{option?.suffixCount}</p>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 p-3">
          {activeTab === 0 && (
            <div>
              <div>
                <label>Show orders for</label>
                <select className="w-full border border-slate-300 px-3 py-2 rounded-md mt-2">
                  <option value="All">All</option>
                  <option value="Custom">Custom</option>
                  <option value="Last 30 days">Last 30 days</option>
                  <option value="This month">This month</option>
                  <option value="Last month">Last month</option>
                  <option value="This quarter">This quarter</option>
                  <option value="2 quarter ago">2 quarter ago</option>
                  <option value="This year">This year</option>
                  <option value="Last year">Last year</option>
                </select>
              </div>
              <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4 mt-4">
                <div className="w-full">
                  <label>From</label>
                  <div
                    className="w-full flex items-center border border-slate-300 mt-2 rounded-md p-2 cursor-pointer"
                    onClick={handleClick}
                  >
                    <FiCalendar
                      className="inline mr-2 text-gray-400"
                      size={15}
                    />
                    <span className="text-gray-400">Pick a date</span>
                    <input
                      type="date"
                      ref={dateInputRef}
                      className="hidden"
                      onChange={(e) => console.log(e.target.value)} // Handle the selected date here
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label>To</label>
                  <div
                    className="w-full flex items-center border border-slate-300 mt-2 rounded-md p-2 cursor-pointer"
                    onClick={handleClick}
                  >
                    <FiCalendar
                      className="inline mr-2 text-slate-400"
                      size={15}
                    />
                    <span className="text-slate-400">Pick a date</span>
                    <input
                      type="date"
                      // ref={dateInputRef}
                      className="hidden"
                      onChange={(e) => console.log(e.target.value)} // Handle the selected date here
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 1 && (
            <div className="lg:w-full flex items-center gap-2 border border-slate-300 bg-slate-50 px-3 py-1.5 rounded-md focus:ring-1 focus:ring-blue-400">
              <FiSearch
                // color="LightSlateGray"
                className="text-lg text-slate-400"
              />
              <input
                type="search"
                name="searchPayer"
                id="searchPayer"
                placeholder="Search Payer or attendee name"
                className="searchInput placeholder:text-sm outline-none text-sm w-full bg-transparent"
              />
            </div>
          )}
          {activeTab === 2 && (
            <div className="text-sm">
              <div className="flex gap-5 items-center">
                <div className="flex items-center gap-2">
                  <input type="radio" name="searchByType" id="searchByName" />
                  <label htmlFor="searchByName"> Search by name</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="radio" name="searchByType" id="searchByTags" />
                  <label htmlFor="searchByTags"> Search by tags</label>
                </div>
              </div>
              <div className="mt-4 lg:w-full flex items-center gap-2 border border-slate-300 bg-slate-50 px-3 py-1.5 rounded-md focus:ring-1 focus:ring-blue-400">
                <FiSearch
                  // color="LightSlateGray"
                  className="text-lg text-slate-400"
                />
                <input
                  type="search"
                  name="searchPayer"
                  id="searchPayer"
                  placeholder="Search service name"
                  className="searchInput placeholder:text-sm outline-none text-sm w-full bg-transparent"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-2 items-center justify-end w-full border-t px-3 py-2">
        <button
          onClick={handleReset}
          className="px-4 border rounded-md py-2.5 lg:py-1.5 hover:bg-slate-100 font-medium"
        >
          Reset to Default
        </button>
        <button
          onClick={() => {
            setShowFilterModal(false);
            setActiveTab(0);
          }}
          className="px-4  bg-black rounded-md text-white py-2.5 lg:py-1.5 hover:bg-black/75"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
