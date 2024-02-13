import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import {
  AiOutlineUserSwitch,
  AiOutlineSearch,
  AiOutlineMessage,
  AiOutlineBell,
} from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoAddOutline } from "react-icons/io5";
import logo from "@/assets/svg/logo.svg";

import SearchUsers from "../SearchUsers";
import { ROUTES } from "@/utils/RouterConfig";
import { logoutAction } from "@/store/AuthSlice";

const MAX_TAB_WIDTH = 1023;

const DUMMY_USERS = [
  {
    id: 1,
    name: "John Doe",
    email: "johnDoe@pixelhexdigital.com",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "janDoe@pixelhexdigital.com",
  },
  {
    id: 3,
    name: "Alex",
    email: "alex@gmail.com",
  },
  {
    id: 4,
    name: "John",
    email: "",
  },
];

export default function TopBar({ currentUser }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [users, setUsers] = useState(DUMMY_USERS);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isTabView = useMediaQuery({
    query: `(max-width: ${MAX_TAB_WIDTH}px)`,
  });

  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  const openUser = (user) => {
    navigate(ROUTES.PROFILE, {
      state: {
        id: user.id,
        email: user.email,
      },
    });
  };

  const handleSearch = () => {
    if (searchQuery !== "") {
      let searched = DUMMY_USERS.filter((user) => {
        return Object.values(user)
          .join("")
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      });

      setFilteredUsers(searched);
    } else {
      setFilteredUsers(users);
    }
  };

  useEffect(() => {
    let debounced = setTimeout(() => {
      handleSearch();
    }, 1000);

    return () => clearTimeout(debounced);
  }, [searchQuery]);

  useEffect(() => {
    // getAllUsers(setUsers);
  }, []);

  // Change isSearch to false when tab view is active and vice versa to avoid conflicts in UI and UX
  useEffect(() => {
    !isTabView && setIsSearch(false);
  }, [isTabView]);

  const searchBarProps = {
    setIsSearch,
    searchQuery,
    setSearchQuery,
    isTabView,
    searchData: filteredUsers,
    onChange: openUser,
  };

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-20 flex flex-row items-center justify-between w-full h-20 px-4 bg-white border-b shadow-md md:px-8 ">
      <div className="flex w-2/4 gap-18 ">
        <img className="w-20 ml-4 md:w-28 " src={logo} alt="BNMLogo" />
        {!isTabView && <SearchUsers {...searchBarProps} />}
      </div>
      {isSearch ? (
        <div className="flex w-full mr-4">
          <SearchUsers {...searchBarProps} />
        </div>
      ) : (
        <div className="flex items-center justify-between px-4 h-full md:w-[55%] w-full max-w-xl">
          <button
            className={`flex 
            ${isTabView ? "w-fit" : "w-56 btn-primary"}
            `}
          >
            <IoAddOutline
              size={30}
              className={`
              ${isTabView ? "text-gray-500" : "text-white"}`}
            />
            <p className="text-center ">
              {!isTabView && (
                <span className="ml-2 text-base ">Create New Post</span>
              )}
            </p>
          </button>
          {isTabView && (
            <AiOutlineSearch
              size={30}
              className="text-gray-500 cursor-pointer hover:text-black"
              onClick={() => setIsSearch(true)}
            />
          )}

          <NavLink to={ROUTES.CONNECTIONS}>
            {({ isActive }) => (
              <AiOutlineUserSwitch
                // size={isActive ? 35 : 30}
                size={30}
                className={`text-gray-500 cursor-pointer hover:text-black ${
                  isActive && "text-black"
                }`}
              />
            )}
          </NavLink>
          <NavLink to={ROUTES.MESSAGES}>
            {({ isActive }) => (
              <AiOutlineMessage
                // size={isActive ? 35 : 30}
                size={30}
                className={`text-gray-500 cursor-pointer hover:text-black ${
                  isActive && "text-black"
                }`}
              />
            )}
          </NavLink>
          <NavLink to={ROUTES.NOTIFICATIONS}>
            {({ isActive }) => (
              <AiOutlineBell
                // size={isActive ? 35 : 30}
                size={30}
                className={`text-gray-500 cursor-pointer hover:text-black ${
                  isActive && "text-black"
                }`}
              />
            )}
          </NavLink>
          {currentUser?.imageLink ? (
            <img
              className="object-cover w-10 h-10 rounded-full cursor-pointer"
              src={currentUser?.imageLink}
              alt="user"
              onClick={handleLogout}
            />
          ) : (
            <HiOutlineUserCircle
              size={30}
              className="text-gray-500 cursor-pointer hover:text-black"
              onClick={handleLogout}
            />
          )}
        </div>
      )}
    </div>
  );
}
