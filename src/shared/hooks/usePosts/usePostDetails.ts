import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "app/Providers/StoreProvider/configureStore";
import {
  selectPost,
  selectPostLoading,
} from "pages/PostsPage/ui/PostDetailsPage/postDetailsSelectors";
import { fetchPostAsync } from "entities/Post/model/services/fetchPostAsync/fetchPostAsync";

export default function usePostDetails(postId: string | undefined) {
  const dispatch = useAppDispatch();
  const post = useSelector(selectPost);
  const isLoaded = useSelector(selectPostLoading);

  useEffect(() => {
    const storedPost = localStorage.getItem("postDetails");
    if (!isLoaded && postId !== undefined && !post && storedPost) {
      dispatch(fetchPostAsync(postId));
    }
  }, [postId, isLoaded, post, dispatch]);

  return {
    post,
    isLoaded,
  };
}
