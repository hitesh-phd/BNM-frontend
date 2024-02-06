import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";

import SearchInput from "@/components/SearchUsers";
import { DUMMY_USERS } from "../constant";

// Maximum users to show
const MAXIMUM_USERS = 10;

const ConnectionTab = () => {
  const [ConnectionData, setConnectionData] = useState(DUMMY_USERS);

  // useEffect(() => {
  //   const fetchConnectionData = async () => {
  //     const { data } = await axios.get("https://dummyjson.com/users");
  //     setConnectionData(data?.users);
  //   };
  //   fetchConnectionData();
  // }, []);

  return (
    <div className="flex flex-col gap-4">
      <SearchInput />
      <p className="mt-5 text-lg leading-7 text-zinc-900">
        {ConnectionData?.length} Connections
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
            <AiOutlineMinus
              size={20}
              role="button"
              className="text-black transition-all cursor-pointer hover:text-red-700 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectionTab;
