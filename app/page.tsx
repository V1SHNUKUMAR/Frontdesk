"use client";

import {
  FiCalendar,
  FiDownload,
  FiFilter,
  FiSearch,
  FiUser,
} from "react-icons/fi";
import Sidebar from "./components/Sidebar";
import { LuHash, LuRefreshCcw } from "react-icons/lu";
import { BsLayoutSplit } from "react-icons/bs";
import { FaRegDotCircle } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";
import Image from "next/image";
import EditColModal from "./components/modals/EditColModal";
import FilterModal from "./components/modals/FilterModal";

import TableData from "./assets/json/tableData.json";

interface OptionType {
  id: number;
  isChecked: boolean;
  label: string;
}

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isSidebarOpenForMobile, setIsSidebarOpenForMobile] =
    useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [showEditColModal, setShowEditColModal] = useState<boolean>(false);

  const options = [
    {
      id: 1,
      isChecked: true,
      label: "Order Created On",
    },
    {
      id: 2,
      isChecked: true,
      label: "Payer",
    },
    {
      id: 3,
      isChecked: true,
      label: "Status",
    },
    {
      id: 4,
      isChecked: true,
      label: "Email",
    },
    {
      id: 5,
      isChecked: true,
      label: "Payer Phone",
    },
    {
      id: 6,
      isChecked: true,
      label: "Service",
    },
    {
      id: 7,
      isChecked: true,
      label: "Scheduled",
    },
  ];

  const [optionsList, setOptionsList] = useState<OptionType[]>(options);

  return (
    <main className="lg:flex lg:flex-row">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isSidebarOpenForMobile={isSidebarOpenForMobile}
        setIsSidebarOpenForMobile={setIsSidebarOpenForMobile}
      />
      <div className="bg-white p-3 m-2 flex-1 rounded-lg">
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              setIsSidebarOpenForMobile((currVal: boolean) => !currVal)
            }
            className="flex gap-3 items-center lg:hidden"
          >
            <Image src="/brand-logo.svg" width={25} height={25} alt="logo" />
          </button>

          <h3 className="text-xl font-bold tracking-wide">Waitlist</h3>
        </div>
        <div className="text-sm flex flex-col lg:flex-row lg:items-center gap-3 my-5">
          <button className="text-left font-medium rounded-lg border border-slate-500 px-3 py-2 min-w-72">
            All Waitlists <span className="text-slate-500 text-xs">100</span>
          </button>
          <button className="text-left font-medium rounded-lg border border-slate-200 px-3 py-2 min-w-72">
            Newly Added <span className="text-slate-500 text-xs">50</span>
          </button>
          <button className="text-left font-medium rounded-lg border border-slate-200 px-3 py-2 min-w-72">
            Leads <span className="text-slate-500 text-xs">20</span>
          </button>
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-3 lg:items-center my-5">
          <div className="relative">
            <button
              onClick={() => {
                setShowEditColModal(false);
                setShowFilterModal((currVal) => !currVal);
              }}
              className="flex items-center justify-center gap-1 font-medium px-4 py-2.5 bg-slate-100 rounded-lg hover:bg-slate-200"
            >
              <FiFilter />
              <span className="text-xs">Add Filter</span>
            </button>
            <FilterModal
              showFilterModal={showFilterModal}
              setShowFilterModal={setShowFilterModal}
            />
          </div>

          <div className="flex gap-6 items-center mr-5">
            <div className="w-2/3 lg:w-full flex items-center gap-2 shadow-md px-3 py-1.5 rounded-md focus:ring-1 focus:ring-blue-400">
              <FiSearch color="LightSlateGray" size={14} />
              <input
                type="search"
                name="searchClient"
                id="searchClient"
                placeholder="Search client"
                className="searchInput placeholder:text-sm outline-none text-sm w-full"
              />
            </div>
            <button>
              <LuRefreshCcw />
            </button>
            <div className="relative">
              <button
                onClick={() => {
                  setShowFilterModal(false);
                  setShowEditColModal((currVal) => !currVal);
                }}
                className=""
              >
                <BsLayoutSplit />
              </button>
              <EditColModal
                showEditColModal={showEditColModal}
                setShowEditColModal={setShowEditColModal}
                optionsList={optionsList}
                setOptionsList={setOptionsList}
                defaultOptions={options}
              />
            </div>
            <button>
              <FiDownload />
            </button>
          </div>
        </div>
        <div className="mx-auto overflow-auto">
          <div className="flex flex-col">
            <div className="overflow-auto border sm:rounded-lg">
              <div className="inline-block min-w-full align-middle">
                <div className="">
                  <table className="divide-y divide-slate-200 table-fixed min-w-full">
                    <thead className="bg-slate-100">
                      <tr className="text-xs tracking-wider text-left text-slate-500">
                        <th scope="col" className="py-3 pl-5 pr-3">
                          <div className="flex items-center">
                            <input
                              id="checkbox-all"
                              type="checkbox"
                              className="w-3.5 h-3.5 text-blue-600 bg-slate-100 border border-slate-100 focus:ring-blue-500"
                            />
                            <label htmlFor="checkbox-all" className="sr-only">
                              checkbox
                            </label>
                          </div>
                        </th>
                        {optionsList[0].isChecked && (
                          <th scope="col" className="py-3 px-3 font-medium">
                            <FiCalendar
                              className="inline mr-2 mb-1"
                              size={15}
                            />
                            <span>Created On</span>
                          </th>
                        )}
                        {optionsList[1].isChecked && (
                          <th scope="col" className="py-3 px-3 font-medium">
                            <FiUser className="inline mr-2 mb-1" size={15} />
                            <span>Payer</span>
                          </th>
                        )}
                        {optionsList[2].isChecked && (
                          <th scope="col" className="py-3 px-3 font-medium">
                            <FaRegDotCircle
                              className="inline mr-2 mb-1"
                              size={15}
                            />
                            <span>Status</span>
                          </th>
                        )}
                        {optionsList[3].isChecked && (
                          <th scope="col" className="py-3 px-3 font-medium">
                            <LuHash className="inline mr-2 mb-1" size={15} />
                            <span>Email</span>
                          </th>
                        )}
                        {optionsList[4].isChecked && (
                          <th scope="col" className="py-3 px-3 font-medium">
                            <LuHash className="inline mr-2 mb-1" size={15} />
                            <span>Payer Phone</span>
                          </th>
                        )}
                        {optionsList[5].isChecked && (
                          <th scope="col" className="py-3 px-3 font-medium">
                            <LuHash className="inline mr-2 mb-1" size={15} />
                            <span>Services</span>
                          </th>
                        )}
                        {optionsList[6].isChecked && (
                          <th scope="col" className="py-3 px-3 font-medium">
                            <FiCalendar
                              className="inline mr-2 mb-1"
                              size={15}
                            />
                            <span>Scheduled</span>
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {TableData.data.map((obj, index) => (
                        <tr key={obj.id} className="hover:bg-slate-50 text-xs">
                          <td className="py-2 pl-5 pr-3 w-4">
                            <div className="flex items-center">
                              <input
                                id="checkbox-all"
                                type="checkbox"
                                className="w-3.5 h-3.5 text-blue-600 bg-slate-100 border border-slate-100 focus:ring-blue-500"
                              />
                              <label
                                htmlFor="checkbox-table-1"
                                className="sr-only"
                              >
                                checkbox
                              </label>
                            </div>
                          </td>
                          {optionsList[0].isChecked && (
                            <td className="py-2 px-3 text-slate-900 whitespace-nowrap ">
                              {obj.createdOn}
                            </td>
                          )}
                          {optionsList[1].isChecked && (
                            <td className="py-2 px-3 text-slate-500 whitespace-nowrap ">
                              {obj.payer}
                            </td>
                          )}
                          {optionsList[2].isChecked && (
                            <td className="py-2 px-3 text-slate-900 whitespace-nowrap ">
                              <div
                                className={`flex gap-1.5 items-center w-fit px-3 py-1.5 font-medium rounded-full 
                                ${
                                  obj.status === "Active"
                                    ? "bg-green-50 text-green-600"
                                    : obj.status === "Inactive"
                                    ? "bg-slate-100 text-slate-700"
                                    : "bg-blue-50 text-blue-500"
                                }`}
                              >
                                <div
                                  className={`w-2 h-2  rounded-full ${
                                    obj.status === "Active"
                                      ? "bg-green-500"
                                      : obj.status === "Inactive"
                                      ? "bg-slate-700"
                                      : "bg-blue-500"
                                  }`}
                                ></div>
                                {obj.status}
                              </div>
                            </td>
                          )}
                          {optionsList[3].isChecked && (
                            <td className="py-2 px-3 text-slate-900 whitespace-nowrap ">
                              {obj.email}
                            </td>
                          )}
                          {optionsList[4].isChecked && (
                            <td className="py-2 px-3 text-slate-900 whitespace-nowrap ">
                              {obj.payerPhone}
                            </td>
                          )}
                          {optionsList[5].isChecked && (
                            <td className="py-2 px-3 text-slate-900 whitespace-nowrap ">
                              {obj.services}
                            </td>
                          )}
                          {optionsList[6].isChecked && (
                            <td className="py-2 px-3 text-slate-900 whitespace-nowrap ">
                              {obj.scheduled}
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 my-5 text-sm text-slate-500 font-medium">
          <div>
            <span>Displaying</span>
            <select className="px-2 py-1 rounded-lg mx-2 bg-slate-100 text-black">
              <option>10</option>
              <option>15</option>
              <option>20</option>
              <option>25</option>
              <option>30</option>
            </select>
            out of <span className="text-black">104</span>
          </div>
          <div className="mr-5 flex items-center gap-0">
            <button className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-slate-100">
              <MdKeyboardArrowLeft />
              Previous
            </button>

            <div className="flex items-center gap-1">
              <button className="px-2.5 py-1.5 rounded-md hover:bg-slate-100">
                1
              </button>
              <button className="px-2.5 py-1.5 border border-slate-200 rounded-md">
                2
              </button>
              <button className="px-2.5 py-1.5 rounded-md hover:bg-slate-100">
                3
              </button>
            </div>
            <button className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-slate-100">
              Next
              <MdKeyboardArrowRight />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
