import { getUserChatsAction } from "@/store/ChatSlice";
import { selectUserChatsData } from "@/store/ChatSlice";
import { selectToken } from "@/store/AuthSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const MessagePage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const chatData = useSelector(selectUserChatsData);
  const token = useSelector(selectToken);

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
  return <div className="col-span-1">MessagePage</div>;
};

export default MessagePage;
