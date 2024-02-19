import { createAsyncThunk } from "@reduxjs/toolkit";
import agent from "app/api/agent";
import { AxiosError } from "axios";
import { User } from "entities/Account";
import { FieldValues } from "react-hook-form";

export const signInUser = createAsyncThunk<User, FieldValues>(
  "account/signInUser", 
  async (data, thunkAPI) => {
    try {
      const userDto = await agent.Account.login(data);
      const { ...user } = userDto;

      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      const customError: AxiosError = error as AxiosError;
      return thunkAPI.rejectWithValue({ error: customError.message });
    }
  }
);
