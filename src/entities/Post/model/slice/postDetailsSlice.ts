import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/Providers/StoreProvider/configureStore";
import { fetchPostAsync } from "../services/fetchPostAsync/fetchPostAsync";
import { Post } from "../types/PostSchema";

export interface PostDetailsState {
  isLoading: boolean;
  status: string;
  data?: Post;
}

const initialState: PostDetailsState = {
  isLoading: false,
  status: "idle",
  data: undefined,
};

export const postDetailsSlice = createSlice({
  name: "postDetails",
  initialState,
  reducers: {
    updateReactions: (state, action) => {
      if (state.data) {
        state.data.reactions += action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostAsync.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(fetchPostAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "succeeded";
        state.data = action.payload;
        // localStorage.setItem("postDetails", JSON.stringify(action.payload));
      })
      .addCase(fetchPostAsync.rejected, (state, _) => {
        state.isLoading = false;
        state.status = "failed";
      });
  },
});

export const { updateReactions } = postDetailsSlice.actions;

export default postDetailsSlice.reducer;

export const selectPostDetails = (state: RootState) => state.postDetails;
