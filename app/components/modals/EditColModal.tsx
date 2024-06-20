"use client";

import React, { useEffect, useRef, useState } from "react";

interface OptionType {
  id: number;
  isChecked: boolean;
  label: string;
}

interface PropTypes {
  showEditColModal: boolean;
  setShowEditColModal: any;
  optionsList: OptionType[];
  setOptionsList: any;
  defaultOptions: OptionType[];
}

const EditColModal = ({
  showEditColModal,
  setShowEditColModal,
  optionsList,
  setOptionsList,
  defaultOptions,
}: PropTypes) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleChange = (id: number) => {
    const updatedValues = optionsList.map((obj) => {
      if (id === obj.id) {
        return { ...obj, isChecked: !obj.isChecked };
      }
      return obj;
    });

    setOptionsList(updatedValues);
  };

  const handleReset = () => {
    setOptionsList(defaultOptions);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowEditColModal(false);
      }
    };

    if (showEditColModal) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showEditColModal, setShowEditColModal]);

  return (
    <div
      ref={modalRef}
      className={`overflow-hidden absolute -right-16 -translate-x-1 top-full  mt-2 z-50 lg:text-xs bg-white w-[90vw] sm:w-[50vw] lg:w-64 p-3 rounded-lg border shadow-lg duration-300 ${
        showEditColModal ? "opacity-100 mt-4" : "opacity-0 pointer-events-none"
      }`}
    >
      <h4 className="font-semibold text-sm">Edit Columns</h4>
      <p className="text-slate-500">Select the columns to rearrange</p>
      <ul className="space-y-2 my-3">
        {optionsList.map((option, index) => (
          <li key={option.id} className="flex items-center gap-3">
            <input
              checked={option.isChecked}
              type="checkbox"
              name={option.label}
              id={`${option.label}-${index}`}
              className="text-black"
              onChange={() => handleChange(option.id)}
            />
            <label
              htmlFor={`${option.label}-${index}`}
              className="border rounded-lg px-2 py-1.5 w-full font-medium"
            >
              {option.label}
            </label>
          </li>
        ))}
      </ul>
      <div className="flex gap-2 items-center">
        <button
          onClick={handleReset}
          className="w-1/2 border rounded-lg py-2 lg:py-1.5 hover:bg-slate-100 font-medium"
        >
          Reset to Default
        </button>
        <button
          onClick={() => setShowEditColModal(false)}
          className="w-1/2 bg-black rounded-lg text-white py-2 lg:py-1.5 hover:bg-black/75"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default EditColModal;
