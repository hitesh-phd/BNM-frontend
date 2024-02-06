import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

import SearchInput from "@/components/SearchUsers";
import { DUMMY_USERS } from "../constant";

// Maximum users to show
const MAXIMUM_USERS = 10;

export const RequestTab = () => {
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
            <div className="flex gap-3">
              <button className={twMerge("btn-primary", "h-8 w-20")}>
                Accept
              </button>
              <button
                className={twMerge(
                  "btn",
                  "h-8 px-2 hover:bg-gray-100 border-0"
                )}
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
