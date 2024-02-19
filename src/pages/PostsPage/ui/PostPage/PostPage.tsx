import { CircularProgress, Grid, Typography } from "@mui/material"; // Import Material-UI components
import React from "react";
import usePosts from "shared/hooks/usePosts/usePosts";
import PostsList from "../PostsList/PostsList";

const PostPage: React.FC = () => {
  const { posts, isLoaded } = usePosts();

  if (!isLoaded) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={{ marginTop: "5rem" }}>
      <Typography variant="h2" align="center" gutterBottom>
        Posts
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        <PostsList posts={posts} />S
      </Grid>
    </div>
  );
};

export default PostPage;
