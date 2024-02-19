import { Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { ErrorBoundary } from "app/Providers/ErrorBoundary";
import { useAppSelector } from "app/Providers/StoreProvider/configureStore";
import {
  getAccountDetailsId,
  getAccountDetailsRoles,
} from "entities/Account/model/selectors/accountDetails";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "shared/components/SearchBar/SearchBar";
import { SignedInMenu } from "shared/components/SignedInMenu";

const midLinks = [{ title: "posts", path: "/posts" }];

const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const navStyles = {
  color: "inherit",
  textDecoration: "none",
  typography: "h6",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "text.secondary",
  },
};

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

export const Header = ({ handleThemeChange, darkMode }: Props) => {
  const userRoles = useAppSelector(getAccountDetailsRoles);
  const userId = useAppSelector(getAccountDetailsId);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <ErrorBoundary>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box display="flex" alignItems="center">
            {isMobile ? ( // Hamburger menu icon for mobile
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerOpen}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Typography
                variant="h6"
                component={NavLink}
                to="/"
                sx={navStyles}
              >
                Acterio Project
              </Typography>
            )}
            <Switch checked={darkMode} onChange={handleThemeChange} />
          </Box>

          {!isMobile && ( // Show midLinks on non-mobile screens
            <List sx={{ display: "flex" }}>
              {midLinks.map(({ title, path }) => (
                <ListItem
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={navStyles}
                >
                  {title.toUpperCase()}
                </ListItem>
              ))}
              {userId && userRoles?.includes("Admin") && (
                <ListItem component={NavLink} to={"/inventory"} sx={navStyles}>
                  INVENTORY
                </ListItem>
              )}
            </List>
          )}
          <SearchBar />

          <Box display="flex" alignItems="center">
            {userId ? (
              <SignedInMenu />
            ) : (
              <List sx={{ display: "flex" }}>
                {rightLinks.map(({ title, path }) => (
                  <ListItem
                    component={NavLink}
                    to={path}
                    key={path}
                    sx={navStyles}
                  >
                    {title.toUpperCase()}
                  </ListItem>
                ))}
              </List>
            )}
          </Box>

          {/* Drawer for mobile */}
          <Drawer anchor="left" open={openDrawer} onClose={handleDrawerClose}>
            <List>
              {midLinks.map(({ title, path }) => (
                <ListItem
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={navStyles}
                  onClick={handleDrawerClose}
                >
                  {title.toUpperCase()}
                </ListItem>
              ))}
              {/* {userId && userRoles?.includes("Admin") && (
              <ListItem
                component={NavLink}
                to={"/inventory"}
                sx={navStyles}
                onClick={handleDrawerClose}
              >
                INVENTORY
              </ListItem>
            )} */}
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>
    </ErrorBoundary>
  );
};
