import React from "react";
import { format } from "date-fns";
import { RxAvatar } from "react-icons/rx";
import { BiLike } from "react-icons/bi";
import { GoCommentDiscussion } from "react-icons/go";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { formatPostTimestamp } from "@/utils/helper";

const Post = ({
  title,
  content,
  author,
  images,
  createdAt,
  updatedAt,
  likes,
  comments,
  isBookmarked,
  isLiked,
}) => {
  return (
    <div className="p-4 bg-white rounded-md shadow ring-1 ring-n-3 ring-opacity-50">
      <div className="flex gap-4">
        {author?.avatar?.url ? (
          <img
            className="object-cover w-10 h-10 rounded-full"
            src={author.avatar.url}
          ></img>
        ) : (
          <RxAvatar className="w-10 h-10" />
        )}
        <div className="flex flex-col">
          <p className="font-semibold">
            {author.ownerFullName ? author.ownerFullName : author.username}
          </p>
          <p className="text-xs">{formatPostTimestamp(updatedAt)}</p>
        </div>
      </div>

      <p className="mt-10">{content}</p>
      <div className="flex items-center justify-between mt-10">
        <div className="flex gap-4">
          <div
            className={`flex items-center cursor-pointer gap-2 ${
              isLiked && "text-primary-1"
            }`}
          >
            <BiLike size={24} />
            <div>{likes}</div>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <GoCommentDiscussion size={24} />
            <div>{comments}</div>
          </div>
        </div>
        <div className="cursor-pointer">
          {isBookmarked ? (
            <GoBookmarkFill size={24} />
          ) : (
            <GoBookmark size={24} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
