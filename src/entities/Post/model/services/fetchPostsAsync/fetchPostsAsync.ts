import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "app/Providers/StoreProvider/configureStore";
import agent from "app/api/agent";
import { AxiosError } from "axios";
import { PostSchema } from "../../types/PostSchema";

import { getQueryParams } from "../getAxiosParams/getQueryParams";
import { postsSelectors } from "../../slice/postSlice";

export const fetchPostsAsync = createAsyncThunk<
  PostSchema,
  void,
  { state: RootState }
>("posts/fetchPostsAsync", async (_, thunkAPI) => {
  const postsState = postsSelectors.selectAll(thunkAPI.getState());
  const postParams: PostSchema = {
    posts: postsState,
    total: postsState.length,
    skip: 0,
    limit: 0,
  };
  const params = getQueryParams(postParams);
  try {
    const response = await agent.Posts.list(params);
    return response;
  } catch (error) {
    console.log(error as AxiosError);
    const customError: AxiosError = error as AxiosError;
    return thunkAPI.rejectWithValue({ error: customError.message });
  }
});
