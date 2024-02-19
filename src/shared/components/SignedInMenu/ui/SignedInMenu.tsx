import { Button, Fade, Menu, MenuItem } from "@mui/material";
import {
  useAppDispatch,
  useAppSelector,
} from "app/Providers/StoreProvider/configureStore";
import { getAccountDetailsEmail } from "entities/Account/model/selectors/accountDetails";
import { signOut } from "entities/Account/model/slice/accountSlice";
import { useState } from "react";
import { Link } from "react-router-dom";

export const SignedInMenu = () => {
  const dispatch = useAppDispatch();
  const userEmail = useAppSelector(getAccountDetailsEmail);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget as Element);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button color="inherit" onClick={handleClick} sx={{ typography: "h6" }}>
        {userEmail}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem component={Link} to="/orders">
          My posts
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(signOut());
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
