import { createAsyncThunk } from "@reduxjs/toolkit";
import agent from "app/api/agent";
import { Post } from "../../types/PostSchema";
import { AxiosError } from "axios";

export const searchPostAsync = createAsyncThunk<Post[], string>(
  "posts/searchPostAsync",
  async (searchQuery: string, thunkAPI) => {
    console.log("Search query:", searchQuery); // Log the search query
    try {
      const response = await agent.Posts.search(searchQuery);
      console.log("Search response:", response);
      return response;
    } catch (error) {
      const errorMessage = (error as AxiosError).message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
