import { createAsyncThunk } from "@reduxjs/toolkit";
import agent from "app/api/agent";
import { AxiosError } from "axios";

export const deleteOnePostAsync = createAsyncThunk<void, string>(
  "posts/deleteOnePostAsync",
  async (postId: string, thunkAPI) => {
    try {
      await agent.Posts.deleteOne(postId);  
      console.log("@postId inside fetch", postId);
      
    } catch (error) {
      console.log(error as AxiosError);
      const customError: AxiosError = error as AxiosError;
      return thunkAPI.rejectWithValue({ error: customError.message });
    }
  }
);
