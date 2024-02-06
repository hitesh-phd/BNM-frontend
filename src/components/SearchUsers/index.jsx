// import React from "react";

// const SearchUsers = ({
//   setIsSearch,
//   setSearchInput,
//   isTabView,
//   searchInput,
// }) => {
//   return (
//     <div className="w-[40%] ml-4 flex items-center">
//       <input
//         placeholder="Search Users.."
//         onChange={(event) => setSearchInput(event.target.value)}
//         value={searchInput}
//         className="w-full h-13 px-3.5 bg-n-2/90 border-2 border-n-2/50 rounded-lg base2  text-n-7 outline-none transition-colors placeholder:text-n-4/50 focus:bg-n-2 pl-[3.125rem]"
//       />

//       {isTabView && (
//         <AiOutlineCloseCircle
//           className="-ml-8 text-gray-500 cursor-pointer hover:text-black"
//           size={20}
//           onClick={() => {
//             setIsSearch(false);
//             setSearchInput("");
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default SearchUsers;

import React from "react";
import { Combobox, Transition } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import { AiOutlineCloseCircle } from "react-icons/ai";

import Icon from "../Icon";

const SearchInput = ({
  onChange,
  searchQuery,
  setSearchQuery,
  searchData,
  classInput,
  disableSearInput = false,
  searchLoader = false,
  setIsSearch,
  isTabView,
  placeholder = "Search Users..",
  value = "",
}) => (
  <div
    className={`relative flex flex-col ss:flex-row justify-between items-center ss:gap-5 z-2 md:space-x-5 md:justify-start w-full `}
  >
    <div className={twMerge(`relative w-full`, classInput)}>
      <button
        type="button"
        className={`absolute outline-none group left-5 top-3 ${
          disableSearInput && "cursor-not-allowed"
        }`}
      >
        <Icon
          className="w-5 h-5 transition-colors fill-neutral-500 group-hover:fill-n-7 "
          name="search-1"
        />
      </button>

      <Combobox value={value} onChange={onChange} disabled={disableSearInput}>
        <Combobox.Input
          onChange={(event) => setSearchQuery(event.target.value)}
          autoComplete="off"
          placeholder={placeholder}
          className={twMerge(
            `w-full h-13 px-3.5 bg-n-2/90 border-2 border-n-2/50 rounded-lg base2  text-n-7 outline-none transition-colors placeholder:text-n-4/50 focus:bg-n-2 pl-12 pr-10 ui-disabled:cursor-not-allowed ui-disabled:bg-gray-100 ui-disabled:text-gray-700 ui-disabled:placeholder-gray-500`
          )}
        />
        {isTabView && (
          <AiOutlineCloseCircle
            className="absolute text-gray-500 cursor-pointer hover:text-black top-4 right-4"
            size={20}
            onClick={() => {
              setIsSearch(false);
              setSearchQuery("");
            }}
          />
        )}
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Combobox.Options
            className={
              "absolute w-full border-none rounded bg-n-2  text-n-7 placeholder:text-neutral-500 shadow-ring ring-2 mt-2 top-13"
            }
          >
            {searchData?.map(({ name }) => (
              <Combobox.Option key={name} value={name}>
                {({ active }) => (
                  <div
                    key={name}
                    className={`${
                      active ? "bg-n-1/90" : "bg-transparent"
                    } group flex items-center justify-between gap-3 px-5 py-3 cursor-pointer`}
                  >
                    <p className="text-sm font-semibold text-[#51575F] group-hover:text-black">
                      {name}
                    </p>
                  </div>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Transition>
      </Combobox>
      {/* {searchLoader && (
        <div className="absolute transform -translate-y-1/2 top-[60%] right-4">
          <div className="w-5 h-5 border-t-2 border-b-2 rounded-full border-primary-1 animate-spin " />
        </div>
      )} */}
    </div>
  </div>
);

export default SearchInput;
