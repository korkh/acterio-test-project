import { Delete, ThumbUp } from "@mui/icons-material";
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
import { Post } from "entities/Post";
import { fetchPostAsync } from "entities/Post/model/services/fetchPostAsync/fetchPostAsync";
import { postDeleted } from "entities/Post/model/slice/postSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  const [loading, setLoading] = useState(false);
  // target to identify certain delete button
  const [target, setTarget] = useState(0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDeletePost = (id: number) => {
    setLoading(true);
    setTarget(id);
    agent.Posts.deleteOne(String(id))
      .then(() => dispatch(postDeleted(id)))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  const handleFetchPost = async (id: number) => {
    setLoading(true);
    try {
      await dispatch(fetchPostAsync(String(id)));
      navigate(`/posts/${id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
          loading={loading}
          onClick={() => handleFetchPost(post.id)}
          color="primary"
          title="More details"
          endIcon={loading ? <CircularProgress size={20} /> : null}
        >
          More details
        </LoadingButton>
        <LoadingButton
          loading={loading && target === post.id}
          onClick={() => handleDeletePost(post.id)}
          startIcon={<Delete />}
          color="error"
          title="delete"
        />
      </CardActions>
    </Card>
  );
};

export default PostCard;
