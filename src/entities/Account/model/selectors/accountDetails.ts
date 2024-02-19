import { StateSchema } from "app/Providers/StoreProvider/StateSchema";

export const getAccountDetails = (state: StateSchema) => state.account.user;
export const getAccountDetailsId = (state: StateSchema) =>
  state.account.user?.id;
export const getAccountDetailsEmail = (state: StateSchema) =>
  state.account.user?.email;
export const getAccountDetailsFirstName = (state: StateSchema) =>
  state.account.user?.firstName;
export const getAccountDetailsLastName = (state: StateSchema) =>
  state.account.user?.lastName;
export const getAccountDetailsGender = (state: StateSchema) =>
  state.account.user?.gender;
export const getAccountDetailsImage = (state: StateSchema) =>
  state.account.user?.image ?? "";
export const getAccountDetailsRoles = (state: StateSchema) =>
  state.account.user?.roles ?? "user";
export const getAccountDetailsToken = (state: StateSchema) =>
  state.account.user?.token;
