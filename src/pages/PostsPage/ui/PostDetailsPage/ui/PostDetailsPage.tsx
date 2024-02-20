import { Delete, ThumbDown, ThumbUp } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "app/Providers/StoreProvider/configureStore";
import agent from "app/api/agent";
import { updateReactions } from "entities/Post/model/slice/postDetailsSlice";
import { postDeleted } from "entities/Post/model/slice/postSlice";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usePostDetails from "shared/hooks/usePosts/usePostDetails";

const PostDetailsPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const { post, isLoaded } = usePostDetails(postId);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // target to identify certain delete button
  const [target, setTarget] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!post && postId) {
      console.log("Current post in state:", post);
    }
  }, [post, postId]);

  const handleReactionClick = (id: number) => {
    setLoading(true);
    setTarget(id);
    setIsLiked((isLiked) => !isLiked);
    dispatch(updateReactions(isLiked ? -1 : 1));
    setLoading(false);
  };

  const handleDeletePost = (id: number) => {
    setLoading(true);
    setTarget(id);
    agent.Posts.deleteOne(String(id))
      .then(() => dispatch(postDeleted(id)))
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
        navigate("/posts");
      });
  };

  if (!post) {
    return <div>Post not found.</div>;
  }

  if (isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: "secondary.main" }}
            alt={String(post.id)}
            src={`https://source.unsplash.com/random?${post.tags}`}
          >
            {post.id}
          </Avatar>
        }
        title={`Created by user ${post.userId}`}
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "primary.main" },
        }}
      />
      <CardMedia
        sx={{
          height: 295,
          width: "100%",
          paddingTop: "56.25%", // 16:9 aspect ratio (9 / 16 * 100%)
          backgroundSize: "contain",
          bgcolor: "transparent",
        }}
        image={`https://source.unsplash.com/random?${post.title}`}
        title={post.title}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          {post.title}
        </Typography>
        <Typography gutterBottom color="text.primary" variant="body2">
          {`Post id: ${post.id}`}
        </Typography>
        <Typography gutterBottom color="primary" variant="body2">
          {post.body}
        </Typography>
        <Typography gutterBottom color="text.primary" variant="body2">
          {post.reactions && (
            <>
              <ThumbUp color="warning" />
              <span style={{ margin: "0 10px" }}> {post.reactions}</span>
            </>
          )}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`[${post.tags.map((tag) => `#${tag}`).join(", ")}]`}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={loading && target === post.userId}
          onClick={() => handleReactionClick(post.id)}
          color="primary"
          title="More details"
          startIcon={
            loading ? (
              <CircularProgress size={20} />
            ) : isLiked ? (
              <ThumbDown />
            ) : (
              <ThumbUp />
            )
          }
        />
        <LoadingButton
          loading={loading && target === post.id}
          onClick={() => handleDeletePost(post.id)}
          startIcon={<Delete />}
          color="error"
          title="delete"
          endIcon={loading ? <CircularProgress size={20} /> : null}
        />
      </CardActions>
    </Card>
  );
};

export default PostDetailsPage;
