import { Container, Paper, Typography, Divider, Button } from "@mui/material";
import { memo } from "react";
import { Link } from "react-router-dom";

export const NotFoundPage = memo(function NotFoundPage() {
  return (
    <Container component={Paper} style={{ height: 400 }}>
      <Typography gutterBottom variant={"h3"} color={"secondary"}>
        Oops - we could not find what your are looking for!
      </Typography>
      <Divider />
      <Button component={Link} to="/catalog" fullWidth>
        Go back to the shop
      </Button>
    </Container>
  );
});
