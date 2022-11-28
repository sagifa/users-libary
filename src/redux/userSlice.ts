import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AppThunk, RootState } from "./store";
import { UserDataApp, UserUpdateFields } from "../utils/types";
import { axiosPaths } from "../utils/axiosPaths";
import axios from "axios";
import { GetUsersResponse } from "../components/UserList";
import { Dispatch } from "react";
import { parseLocation, parseName } from "../utils/helpers";

interface userDeletePayLoad {
  uuid: string;
}
interface UserState {
  isLoading: boolean;
  isError: boolean;
  data?: UserDataApp[];
}

const initialState: UserState = {
  isLoading: false,
  isError: false,
};

export const userSlice = createSlice({
  name: "user list",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload || false;
    },
    setIsError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload || false;
    },
    setUserListData: (state, action: PayloadAction<UserDataApp[]>) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    deleteUser: (state, action: PayloadAction<any>) => {
      const newUserList = state.data?.filter(
        (user) => user.login.uuid !== action.payload.uuid
      );
      if (!newUserList) return;
      state.data = newUserList;
    },
    editUserData: (state, action: PayloadAction<UserUpdateFields>) => {
      const updatedUserList = state.data?.map((user: UserDataApp) => {
        if (user.login.uuid !== action.payload.uuid) {
          return { ...user };
        } else {
          return {
            ...user,
            name: action.payload.name,
            email: action.payload.email,
            location: action.payload.location,
          };
        }
      });
      state.data = updatedUserList;
    },
  },
});

// --*--*--*--*--*--*--*--*--*--*--*-- //  Actions

export const {
  setIsLoading,
  setIsError,
  setUserListData,
  editUserData,
  deleteUser,
} = userSlice.actions;
// --*--*--*--*--*--*--*--*--*--*--*-- // Selectors

export const selectUserListData = (state: RootState) => state.user.data;
export const selectIsLoading = (state: RootState) => state.user.isLoading;
export const selectIsError = (state: RootState) => state.user.isError;

// --*--*--*--*--*--*--*--*--*--*--*-- //Functions

export async function getUsers(dispatch: Dispatch<any>) {
  dispatch(setIsLoading(true));
  try {
    const { data } = await axios.get<GetUsersResponse>(axiosPaths.userList);
    const res = data.results;
    const list = data.results.map((user) => {
      const name = parseName(user);
      const location = parseLocation(user);
      return { ...user, name: name, location: location };
    });
    dispatch(setUserListData(list));
  } catch (error) {
    dispatch(setIsError(true));
  } finally {
    dispatch(setIsLoading(false));
  }
}
