import { createAsyncThunk } from "@reduxjs/toolkit";
import agent from "app/api/agent";
import { Post } from "../../types/PostSchema";
import { AxiosError } from "axios";

export const fetchPostAsync = createAsyncThunk<Post, string>(
  "postDetails/fetchPostAsync",
  async (postId: string, thunkAPI) => {
    try {
      const post = await agent.Posts.details(postId);
      return post;
    } catch (error) {
      console.error("Error fetching post:", error);
      const customError: AxiosError = error as AxiosError;
      return thunkAPI.rejectWithValue({ error: customError.message });
    }
  }
);