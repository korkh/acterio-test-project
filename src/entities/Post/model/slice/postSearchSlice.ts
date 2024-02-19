import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/Providers/StoreProvider/configureStore";
import { Post } from "../types/PostSchema";
import { searchPostAsync } from "../services/searchPostAsync/searchPostAsync";

export interface PostDetailsState {
  isLoading: boolean;
  status: string;
  error?: string;
  data?: Post[];
}

const initialState: PostDetailsState = {
  isLoading: false,
  status: "idle",
  error: undefined,
  data: undefined,
};

export const postSearchSlice = createSlice({
  name: "postSearch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchPostAsync.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(searchPostAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(searchPostAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default postSearchSlice.reducer;

export const searchPosts = (state: RootState) => state.postDetails;
