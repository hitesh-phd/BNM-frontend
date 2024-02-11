import React, { useEffect, useState } from "react";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostsAction, selectAllPosts } from "@/store/PostSlice";

// name,
// avatar,
// title,
// content,
// images,
// createdAt,
// likes,
// comments,
// isBookmarked,
// isLiked,

const DUMMY_POSTS = [
  {
    id: 1,
    name: "Nguyen Van A",
    avatar: "https://picsum.photos/200",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.",
    images: ["https://picsum.photos/200"],
    createdAt: "2024-01-27",
    likes: 10,
    comments: 20,
    isBookmarked: false,
    isLiked: true,
  },
  {
    id: 2,
    name: "Nguyen Van B",
    avatar: "https://picsum.photos/200",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.",
    images: ["https://picsum.photos/200"],
    createdAt: "2023-09-01",
    likes: 15,
    comments: 20,
    isBookmarked: true,
    isLiked: false,
  },
];

const FeedPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const allPost = useSelector(selectAllPosts);
  useEffect(() => {
    dispatch(
      getAllPostsAction({
        page: 1,
        limit: 10,
        setIsLoading,
        onSuccess: () => {
          console.log("post fetch success");
        },
      })
    );
  }, []);

  useEffect(() => {
    console.log("allPost", allPost);
  }, [allPost]);
  return (
    <div className="flex w-full col-span-5 md:col-span-3 lg:col-span-2">
      <div className="flex flex-col w-full gap-5 p-4">
        {allPost?.posts?.map((post) => (
          <Post key={post._id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default FeedPage;
