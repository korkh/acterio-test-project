import { User } from "./../../types/accountSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import agent from "app/api/agent";
import { AxiosError } from "axios";

import { signIn } from "../../slice/accountSlice";

export const fetchCurrentUser = createAsyncThunk<User>(
  "account/fetchCurrentUser",
  async (_, thunkAPI) => {
    // setting token to the Redux store
    thunkAPI.dispatch(signIn(JSON.parse(localStorage.getItem("user")!)));
    try {
      const userDto = await agent.Account.currentUser();

      localStorage.setItem("user", JSON.stringify(userDto));
      return userDto;
    } catch (error) {
      const customError: AxiosError = error as AxiosError;
      return thunkAPI.rejectWithValue({ error: customError.message });
    }
  },
  {
    // calling API only if we have a token (after browser refresh)
    condition: () => {
      if (!localStorage.getItem("user")) return false;
    },
  }
);
