import { RootState } from "app/Providers/StoreProvider/configureStore";

export const selectPostDetails = (state: RootState) => state.postDetails;

export const selectPost = (state: RootState) => selectPostDetails(state).data;
export const selectPostLoading = (state: RootState) =>
  selectPostDetails(state).isLoading;
