import { createAsyncThunk } from "@reduxjs/toolkit";
import agent from "app/api/agent";
import { Post } from "../../types/PostSchema";
import { AxiosError } from "axios";

export const updateReactionsAsync = createAsyncThunk<
  Post | undefined,
  { postId: string; reactions: number },
  { rejectValue: string }
>("postDetails/updateReactionsAsync", async (data, thunkAPI) => {
  try {
    const response = await agent.Posts.updateReactions(
      data.postId,
      data.reactions
    );
    return response as Post | undefined;
  } catch (error) {
    const errorMessage = (error as AxiosError).message;
    return thunkAPI.rejectWithValue(errorMessage);
  }
});
