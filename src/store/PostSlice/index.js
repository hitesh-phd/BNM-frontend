import { createSlice } from "@reduxjs/toolkit";
import { errorToast, successToast } from "@/utils/helper";
import { apiClient } from "@/utils/https";

const initialState = {
  allPosts: null,
  myPosts: null,
  post: null,
};

export const postSlice = createSlice({
  name: "Post",
  initialState,
  reducers: {
    setAllPosts: (state, action) => {
      state.allPosts = action.payload.data;
    },
    setMyPosts: (state, action) => {
      state.myPosts = action.payload.data;
    },
    setPost: (state, action) => {
      state.post = action.payload.data;
    },
  },
});

export const createPostAction =
  ({ data, setIsLoading, onSuccess, token }) =>
  async (dispatch) => {
    setIsLoading(true);
    try {
      const localHeader = {
        ...apiClient.defaults.headers,
        Authorization: `Bearer ${token}`,
      };
      const response = await apiClient.post("/bnm/posts", data, {
        headers: localHeader,
      });
      dispatch(setPost(response.data));
      onSuccess();
      successToast(response, "Post created successfully");
    } catch (error) {
      errorToast({ error });
    } finally {
      setIsLoading(false);
    }
  };

export const updatePostAction =
  ({ postId, data, setIsLoading, onSuccess, token }) =>
  async (dispatch) => {
    setIsLoading(true);
    try {
      const localHeader = {
        ...apiClient.defaults.headers,
        Authorization: `Bearer ${token}`,
      };
      const response = await apiClient.put(`/bnm/posts/${postId}`, data, {
        headers: localHeader,
      });
      dispatch(setPost(response.data));
      onSuccess();
      successToast(response, "Post updated successfully");
    } catch (error) {
      errorToast({ error });
    } finally {
      setIsLoading(false);
    }
  };

export const removePostImageAction =
  ({ postId, imageId, setIsLoading, onSuccess, token }) =>
  async (dispatch) => {
    setIsLoading(true);
    try {
      const localHeader = {
        ...apiClient.defaults.headers,
        Authorization: `Bearer ${token}`,
      };
      const response = await apiClient.delete(
        `/bnm/posts/${postId}/images/${imageId}`,
        {
          headers: localHeader,
        }
      );
      dispatch(setPost(response.data));
      onSuccess();
      successToast(response, "Post image removed successfully");
    } catch (error) {
      errorToast({ error });
    } finally {
      setIsLoading(false);
    }
  };

export const getAllPostsAction =
  ({ page, limit, setIsLoading, onSuccess }) =>
  async (dispatch) => {
    setIsLoading(true);
    try {
      const response = await apiClient.get("/bnm/posts", {
        params: { page, limit },
      });
      dispatch(setAllPosts(response.data));
      onSuccess();
      successToast(response, "Posts loaded successfully");
    } catch (error) {
      errorToast({ error });
    } finally {
      setIsLoading(false);
    }
  };

// export const getBookmarkedPostsAction =
//   ({ page, limit, setIsLoading, onSuccess, token }) =>
//   async (dispatch) => {
//     setIsLoading(true);
//     try {
//       const localHeader = {
//         ...apiClient.defaults.headers,
//         Authorization: `Bearer ${token}`,
//       };
//       const response = await apiClient.get("/bnm/bookmarks", {
//         params: { page, limit },
//         headers: localHeader,
//       });
//       dispatch(setBookmarkedPosts(response.data));
//       onSuccess();
//       successToast(response, "Bookmarked posts loaded successfully");
//     } catch (error) {
//       errorToast({ error });
//     } finally {
//       setIsLoading(false);
//     }
//   };

export const getMyPostsAction =
  ({ page, limit, setIsLoading, onSuccess, token }) =>
  async (dispatch) => {
    setIsLoading(true);
    try {
      const localHeader = {
        ...apiClient.defaults.headers,
        Authorization: `Bearer ${token}`,
      };
      const response = await apiClient.get("/bnm/posts/me", {
        params: { page, limit },
        headers: localHeader,
      });
      dispatch(setMyPosts(response.data));
      onSuccess();
      successToast(response, "My posts loaded successfully");
    } catch (error) {
      errorToast({ error });
    } finally {
      setIsLoading(false);
    }
  };

export const getPostByIdAction =
  ({ postId, setIsLoading, onSuccess }) =>
  async (dispatch) => {
    setIsLoading(true);
    try {
      const response = await apiClient.get(`/bnm/posts/${postId}`);
      dispatch(setPost(response.data));
      onSuccess();
      successToast(response, "Post fetched successfully");
    } catch (error) {
      errorToast({ error });
    } finally {
      setIsLoading(false);
    }
  };

export const deletePostAction =
  ({ postId, setIsLoading, onSuccess, token }) =>
  async (dispatch) => {
    setIsLoading(true);
    try {
      const localHeader = {
        ...apiClient.defaults.headers,
        Authorization: `Bearer ${token}`,
      };
      const response = await apiClient.delete(`/bnm/posts/${postId}`, {
        headers: localHeader,
      });
      dispatch(setPost(null));
      onSuccess();
      successToast(response, "Post deleted successfully");
    } catch (error) {
      errorToast({ error });
    } finally {
      setIsLoading(false);
    }
  };

export const getPostsByTagAction =
  ({ tag, page, limit, setIsLoading, onSuccess }) =>
  async (dispatch) => {
    setIsLoading(true);
    try {
      const response = await apiClient.get(`/bnm/posts/tag/${tag}`, {
        params: { page, limit },
      });
      dispatch(setAllPosts(response.data));
      onSuccess();
      successToast(response, `Posts with tag #${tag} loaded successfully`);
    } catch (error) {
      errorToast({ error });
    } finally {
      setIsLoading(false);
    }
  };

export const selectAllPosts = (state) => state.Post.allPosts;
// export const selectBookmarkedPosts = (state) => state.Post.bookmarkedPosts;
export const selectMyPosts = (state) => state.Post.myPosts;
export const selectPost = (state) => state.Post.post;

export const { setAllPosts, setBookmarkedPosts, setMyPosts, setPost } =
  postSlice.actions;

export default postSlice.reducer;
