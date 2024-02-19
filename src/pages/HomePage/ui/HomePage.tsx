import { Box, Typography, useMediaQuery } from "@mui/material";

const HomePage = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const titlePositionTop = isSmallScreen ? 100 : 250;

  return (
    <>
      <Box
        position="relative"
        maxWidth="100%"
        overflow="hidden"
        maxHeight="720px"
      >
        <Typography
          variant={isSmallScreen ? "h2" : "h1"}
          sx={{
            position: "absolute",
            top: titlePositionTop,
            left: "45%",
            transform: "translate(-30%, -50%)",
            zIndex: 2,
            color: "white",
            fontWeight: "bold",
          }}
        >
          Welcome to Acertio Test Project!
        </Typography>
      </Box>
    </>
  );
};

export default HomePage;
