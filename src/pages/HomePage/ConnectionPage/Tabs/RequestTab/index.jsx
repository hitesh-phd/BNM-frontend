import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { IoMdPersonAdd } from "react-icons/io";

import SearchInput from "@/components/SearchUsers";
import { DUMMY_USERS } from "../constant";
import { useSelector } from "react-redux";
import { selectRequestList } from "@/store/ConnectionSlice";

// Maximum users to show
const MAXIMUM_USERS = 10;

export const RequestTab = () => {
  const connectionRequestsData = useSelector(selectRequestList);
  console.log("connectionRequestsData", connectionRequestsData);
  const [ConnectionData, setConnectionData] = useState(DUMMY_USERS);

  return (
    <div className="flex flex-col gap-4">
      <SearchInput />
      <p className="mt-5 text-lg leading-7 text-zinc-900">
        {ConnectionData?.length} Requests
      </p>
      <div className="flex flex-col gap-8 mt-5">
        {ConnectionData?.slice(0, MAXIMUM_USERS)?.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between w-full bg-white "
          >
            <div className="flex items-center">
              <img
                className="object-cover w-10 h-10 rounded-full"
                src={user.image}
                alt="avatar"
              />
              <div className="ml-2 text-sm font-medium text-gray-700">
                {user.firstName + " " + user.lastName}
              </div>
            </div>
            <div className="flex ">
              {/* <button className={twMerge("btn-primary", "h-8 w-20")}>
                Accept
              </button> */}
              <IoMdPersonAdd
                size={25}
                className="text-black transition-all cursor-pointer hover:text-green-700 hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
