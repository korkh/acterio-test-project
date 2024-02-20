import { Box, Typography, useMediaQuery } from "@mui/material";
import SearchBar from "shared/components/SearchBar/SearchBar";

const HomePage = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const titlePositionTop = isSmallScreen ? 100 : 250;

  return (
    <>
       <Typography
          variant={isSmallScreen ? "h3" : "h2"}
          sx={{
            position: "absolute",
            top: titlePositionTop,
            left: "45%",
            transform: "translate(-30%, -50%)",
            zIndex: 2,
            color: "white",
            fontWeight: "bold",
            textAlign: "center"
          }}
        >
          Welcome to<br /> <span>Acertio Test Project!</span>
        </Typography>
    </>
  );
};

export default HomePage;
