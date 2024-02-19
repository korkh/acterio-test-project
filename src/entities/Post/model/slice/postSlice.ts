import {
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "app/Providers/StoreProvider/configureStore";
import { Post } from "entities/Post";
import { fetchPostsAsync } from "../services/fetchPostsAsync/fetchPostsAsync";

interface PostsState extends EntityState<Post, number> {
  isLoaded?: boolean;
  status?: string;
}

// Create entity adapter
const postsAdapter = createEntityAdapter<Post>({
  // Sort posts by id
  sortComparer: (a, b) => a.id - b.id,
});

const initialState: PostsState = {
  ...postsAdapter.getInitialState(),
  isLoaded: false,
  status: "idle",
};

export const postsSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    // Add a new post to the state
    postAdded(state, action: PayloadAction<Post>) {
      postsAdapter.addOne(state, action.payload);
    },
    // Add multiple posts to the state
    postsReceived(state, action: PayloadAction<Post[]>) {
      const newState = { ...state, isLoaded: true };
      postsAdapter.setAll(newState, action.payload);
      return newState;
    },

    // Update a post in the state
    postUpdated(state, action: PayloadAction<Post>) {
      postsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      });
    },
    // Remove a post from the state
    postDeleted(state, action: PayloadAction<number>) {
      postsAdapter.removeOne(state, action.payload);
    },
    // Clear all posts from the state
    allPostsDeleted(state) {
      postsAdapter.removeAll(state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPostsAsync.pending, (state) => {
      state.status = "pendingFetchPosts";
    });
    builder.addCase(fetchPostsAsync.fulfilled, (state, action) => {
      postsAdapter.setAll(state, action.payload.posts);
      state.status = "idle";
      state.isLoaded = true;
    });
    builder.addCase(fetchPostsAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });
  },
});

// Export action creators
export const {
  postAdded,
  postsReceived,
  postUpdated,
  postDeleted,
  allPostsDeleted,
} = postsSlice.actions;

export default postsSlice.reducer;

export const postsSelectors = postsAdapter.getSelectors(
  (state: RootState) => state.posts
);
