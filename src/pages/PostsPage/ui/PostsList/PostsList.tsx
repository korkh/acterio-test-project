import { Grid } from "@mui/material";
import { Post } from "entities/Post";
import usePosts from "shared/hooks/usePosts/usePosts";
import { PostCardSkeleton } from "../PostCard/ui/PostCardSkeleton/PostCardSkeleton";
import PostCard from "../PostCard/ui/PostCard/ui/PostCard";

interface Props {
  posts: Post[];
}

export default function PostsList({ posts }: Props) {
  const { isLoaded } = usePosts();

  return (
    <Grid container spacing={4}>
      {posts.map((post: Post) => (
        <Grid item xs={12} sm={6} md={4} key={post.id}>
          {!isLoaded ? (
            <PostCardSkeleton />
          ) : (
            <PostCard key={post.id + post.title} post={post} />
          )}
        </Grid>
      ))}
    </Grid>
  );
}
