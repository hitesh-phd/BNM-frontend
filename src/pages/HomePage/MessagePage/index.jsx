import { getUserChatsAction, selectUserChatsData } from "@/store/ChatSlice";
import { selectToken } from "@/store/AuthSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AiOutlineMinus } from "react-icons/ai";

import SearchInput from "@/components/SearchUsers";
import { selectUserId } from "@/store/AuthSlice";
import { formatChatTimestamp } from "@/utils/helper";

const MAXIMUM_USERS = 10;

const MessagePage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const chatData = useSelector(selectUserChatsData);
  const token = useSelector(selectToken);
  const currentUserId = useSelector(selectUserId);

  const success = () => {
    console.log("hey");
  };

  useEffect(() => {
    dispatch(
      getUserChatsAction({ data: {}, setIsLoading, onSuccess: success, token })
    );
  }, []);

  useEffect(() => {
    console.log(chatData);
  }, [chatData]);
  return (
    <div className="flex flex-col gap-4">
      <SearchInput />
      <div className="flex flex-col gap-8 mt-5">
        {chatData?.slice(0, MAXIMUM_USERS)?.map((data) => {
          const user = data.participants[0];
          const sender = data.participants[1];
          let recentText = "";
          if (data.lastMessage.sender._id === currentUserId) {
            recentText = `you: ${data.lastMessage.content}`;
          } else {
            recentText = `${data.lastMessage.sender.username}: ${data.lastMessage.content}`;
          }
          const timeStamp = formatChatTimestamp(data.lastMessage.createdAt);
          const dummyThumbnail = "https://robohash.org/Terry.png?set=set4";
          return (
            <div
              key={data._id}
              className="flex items-center justify-between w-full bg-white "
            >
              <div className="flex items-center">
                <img
                  className="object-cover w-10 h-10 rounded-full"
                  src={sender?.avatar?.url || dummyThumbnail}
                  alt="avatar"
                />
                <div className="flex flex-col">
                  <div className="ml-2 text-sm font-medium text-gray-700">
                    {sender.ownerFullName
                      ? sender.ownerFullName
                      : sender.username}
                  </div>
                  <div className="ml-2 text-sm font-medium text-gray-700">
                    {recentText}
                  </div>
                </div>
              </div>
              <div>{timeStamp}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MessagePage;
