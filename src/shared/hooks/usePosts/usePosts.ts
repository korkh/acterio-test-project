import {
  useAppDispatch,
  useAppSelector,
} from "app/Providers/StoreProvider/configureStore";

import { fetchPostsAsync } from "entities/Post/model/services/fetchPostsAsync/fetchPostsAsync";
import { postsSelectors } from "entities/Post/model/slice/postSlice";
import { useEffect } from "react";

export default function usePosts() {
  const posts = useAppSelector(postsSelectors.selectAll);
  const isLoaded = useAppSelector((state) => state.posts.isLoaded);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoaded) {
      dispatch(fetchPostsAsync());
    }
  }, [isLoaded, dispatch]);
  return {
    posts,
    isLoaded,
  };
}
