import { Button, Grid, TextField } from "@mui/material";
import { useAppDispatch } from "app/Providers/StoreProvider/configureStore";
import { searchPostAsync } from "entities/Post/model/services/searchPostAsync/searchPostAsync";
import { useState } from "react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    dispatch(searchPostAsync(searchQuery));
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <TextField
          label="Search posts"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={handleSearchSubmit}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
